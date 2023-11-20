package server

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
)

type Response struct {
	Status    int64      `JSON:"status"`
	ErrorText string     `JSON:"error_text"`
	Data      []FileInfo `JSON:"data"`
}

func CallServer() {
	fs := http.FileServer(http.Dir("./css/"))
	http.Handle("/css/", http.StripPrefix("/css", fs))
	fs2 := http.FileServer(http.Dir("./static/"))
	http.Handle("/static/", http.StripPrefix("/static", fs2))
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
	listOfDirectory, err := readDir(root, sortType)
	if err != nil {
		response := Response{Status: 400, ErrorText: err.Error(), Data: []FileInfo{}}
		ans, _ := json.Marshal(response)
		rw.Write(ans)
		return
	}
	rw.Header().Set("Content-Type", "application/json")

	response := Response{Status: 200, ErrorText: "", Data: listOfDirectory}
	js_data, err := json.Marshal(response)
	if err != nil {
		response := Response{Status: 400, ErrorText: err.Error(), Data: []FileInfo{}}
		ans, _ := json.Marshal(response)
		rw.Write(ans)
		return
	}
	rw.Write(js_data)
}

// StartPage handler главной страницы (отправляет html)
func StartPage(rw http.ResponseWriter, r *http.Request) {
	//указываем путь к нужному файлу
	path := "index.html"

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
