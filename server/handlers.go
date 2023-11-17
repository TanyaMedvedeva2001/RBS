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
	fs2 := http.FileServer(http.Dir("./scripts/"))
	http.Handle("/scripts/", http.StripPrefix("/scripts", fs2))
	http.HandleFunc("/", StartPage) // Устанавливаем роутер
	http.HandleFunc("/dir", directJSON)
	err := http.ListenAndServe(":8080", nil) // устанавливаем порт веб-сервера
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

//directJSON handler, отправляющий по гет-запросам json-файл с инфорамцией
// о файлах в директории
func directJSON(rw http.ResponseWriter, r *http.Request) {
	root := r.URL.Query().Get("root")
	sortType := r.URL.Query().Get("sort")
	listOfDirectory, err := readDir(root, sortType)
	if err != nil {
		http.Error(rw, err.Error(), 400)
		return
	}
	rw.Header().Set("Content-Type", "application/json")

	js_data, err := json.Marshal(listOfDirectory)
	if err != nil {
		http.Error(rw, err.Error(), 400)
		return
	}
	rw.Write(js_data)
}

// func directJSON(rw http.ResponseWriter, r *http.Request) {
// 	root := r.URL.Query().Get("root")
// 	sortType := r.URL.Query().Get("sort")
// 	listOfDirectory, err := readDir(root, sortType)
// 	rw.Header().Set("Content-Type", "application/json")
// 	if err != nil {
// 		response := Response{Status: 400, ErrorText: err.Error(), Data: []FileInfo{}}
// 		jsonData, err := json.Marshal(response)
// 		rw.Write(jsonData)
// 		if err != nil {
// 			http.Error(rw, err.Error(), 400)
// 			return
// 		}
// 		return
// 	}
// 	response := Response{Status: 200, ErrorText: "", Data: listOfDirectory}
// 	jsonData, err := json.Marshal(response)
// 	if err != nil {
// 		http.Error(rw, err.Error(), 400)
// 		return
// 	}
// 	rw.Write(jsonData)
// }

// StartPage handler главной страницы (отправляет html)
func StartPage(rw http.ResponseWriter, r *http.Request) {
	//указываем путь к нужному файлу
	path := "main.html"

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
