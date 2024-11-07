# Используем базовый образ Node.js
FROM node:19-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Копируем wait-for-it.sh для ожидания доступности базы данных
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Компилируем TypeScript в JavaScript
RUN npm run build

# Указываем порт, который будет использовать контейнер
EXPOSE 3000

# Команда для запуска приложения, ожидая готовности базы данных
CMD ["./wait-for-it.sh", "db:5432", "--", "npm", "start"]
