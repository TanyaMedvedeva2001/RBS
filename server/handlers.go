package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

type Statistic struct {
	Time    int64
	Root    string
	Size    int
	SizeStr string
}

type Response struct {
	Status    int        `JSON:"status"`
	ErrorText string     `JSON:"error_text"`
	Data      []FileInfo `JSON:"data"`
}

func countSize(listOfDir []FileInfo) int {
	size := 0
	for _, elem := range listOfDir {
		size += elem.Size
	}
	return size
}
func CallServer() {
	fs := http.FileServer(http.Dir("./public/"))
	http.Handle("/public/", http.StripPrefix("/public", fs))
	http.HandleFunc("/", StartPage) // Устанавливаем роутер
	http.HandleFunc("/dir", directJSON)
	err := http.ListenAndServe(":8080", nil) // устанавливаем порт веб-сервера
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func directJSON(rw http.ResponseWriter, r *http.Request) {
	root := r.URL.Query().Get("root")
	sortType := r.URL.Query().Get("sort")
	startTime := time.Now().UnixNano()
	listOfDirectory, err := readDir(root, sortType)
	endTime := time.Now().UnixNano()
	if err != nil {
		response := Response{Status: 400, ErrorText: err.Error(), Data: []FileInfo{}}
		ans, _ := json.Marshal(response)
		rw.Write(ans)
		return
	}

	rw.Header().Set("Content-Type", "application/json")

	response := Response{Status: 200, ErrorText: "", Data: listOfDirectory}
	jsData, err := json.Marshal(response)
	if err != nil {
		response := Response{Status: 400, ErrorText: err.Error(), Data: []FileInfo{}}
		ans, _ := json.Marshal(response)
		rw.Write(ans)
		return
	}
	rw.Write(jsData)
	size := countSize(listOfDirectory)
	stat := Statistic{
		Time:    (endTime - startTime) / 1e6,
		Root:    root,
		SizeStr: ConvertSize(size),
		Size:    size,
	}
	postPHP(stat)
}

func postPHP(stat Statistic) {
	jsPost, err := json.Marshal(stat)
	req, err := http.NewRequest("POST", "http://localhost:80/SetStat.php", bytes.NewBuffer(jsPost))
	// Устанавливаем заголовок с типом данных в теле запроса
	req.Header.Set("Content-Type", "application/json")

	// Выполняем запрос
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Статус запроса: ", resp.Status)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("Ответ от php: ", string(body))
	defer resp.Body.Close()
	// Выводим ответ от сервера
}

// StartPage handler главной страницы (отправляет html)
func StartPage(rw http.ResponseWriter, r *http.Request) {
	//указываем путь к нужному файлу
	path := "public/dist/index.html"

	//создаем html-шаблон
	tmpl, err := template.ParseFiles(path)
	if err != nil {
		http.Error(rw, err.Error(), 400)
		return
	}
	//выводим шаблон клиенту в браузер
	err = tmpl.Execute(rw, nil)
	if err != nil {
		http.Error(rw, err.Error(), 400)
		return
	}
}
