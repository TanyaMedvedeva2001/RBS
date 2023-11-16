package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

func callServer() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
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

// StartPage handler главной страницы (отправляет html)
func StartPage(rw http.ResponseWriter, r *http.Request) {
	//указываем путь к нужному файлу
	path := filepath.Join("", "main.html")
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
