package main

import (
	"fmt"
	"io/fs"
	"io/ioutil"
	"sort"
	"sync"
)

//FileInfo структура содержащая информацию о файле
type FileInfo struct {
	TypeFile   string
	Name       string
	Size       int
	StringSize string
}

func readDir(root string, sortType string) ([]FileInfo, error) {
	// проверяем флаг сортировки на валидность
	if (sortType != "ASC") && (sortType != "DESC") {
		return []FileInfo{}, fmt.Errorf("Некорректный тип сортировки, остановление выполнение программы")
	}
	listOfFiles := []FileInfo{}
	// var mapOfFileAndDir map[string]int = make(map[string]int)
	lst, err := ioutil.ReadDir(root)
	if err != nil {
		return []FileInfo{}, fmt.Errorf("Oшибка открытия директории root: %v", err)
	}
	var wg sync.WaitGroup
	for _, val := range lst {
		// если объект - директория, проходимся по ней рекурсивно и получаем размер файлов внутри нее
		if val.IsDir() {
			wg.Add(1)
			// многопоточная реализация вычитывания размера директорий в главной папке
			go func(val fs.FileInfo) {
				defer wg.Done()
				sizeOfDir, err := walkInDirectory(fmt.Sprintf("%s%s", root, val.Name()))
				if err != nil {
					fmt.Println(err)
					return
				}
				// сохраняем в лист
				listOfFiles = append(listOfFiles, FileInfo{TypeFile: "Directory", Name: val.Name(),
					Size: sizeOfDir, StringSize: convertSize(sizeOfDir)})
			}(val)
		} else {
			// иначе сохраняем информацию о файл и его размере в срез
			listOfFiles = append(listOfFiles, FileInfo{TypeFile: "File", Name: val.Name(),
				Size: int(val.Size()), StringSize: convertSize(int(val.Size()))})
		}
	}
	wg.Wait()
	// сортировка по размеру в зависимости от флага
	sort.SliceStable(listOfFiles, func(i, j int) bool {
		if sortType == "DESC" {
			return listOfFiles[i].Size > listOfFiles[j].Size
		} else {
			return listOfFiles[i].Size < listOfFiles[j].Size
		}
	})
	return listOfFiles, nil
}

//convertSize предназначена конвертации размера из байтов в другие
func convertSize(sizeByte int) string {
	typeOfSize := [4]string{"byte", "Kb", "Mb", "Gb"}
	for _, val := range typeOfSize {
		if sizeByte < 1024 {
			return fmt.Sprintf("%d %s", sizeByte, val)
		}
		sizeByte /= 1024.0
	}
	return fmt.Sprintf("%d Gb", sizeByte)
}

// walkInDirectory вызывается рекурсивно, считает размер файлов и директорий в директории
func walkInDirectory(path string) (int, error) {
	// считываем текущую директорию
	lst, err := ioutil.ReadDir(path)
	if err != nil {
		return 0, fmt.Errorf("Oшибка открытия директории : %v", err)
	}
	// переменная, накапливающая размер файлов в директории
	tempObjSize := 0
	// проходимся по всем файлам директории
	for _, val := range lst {
		// если попалась новая директория, вызываем рекурсию
		if val.IsDir() {
			tempDirSize, err := walkInDirectory(fmt.Sprintf("%s/%s", path, val.Name()))
			if err != nil {
				fmt.Println(err)
				continue
			} else {
				// полученное значение рекурсии добавляем к аккумулятору
				tempObjSize += tempDirSize
			}
		} else {
			//если это файл, то просто добавляем к аккумулятору его размер
			tempObjSize += int(val.Size())
		}
	}
	// если дошла до конца, значит ошибок нет, можем вернуть аккумулятор
	return tempObjSize, nil
}
