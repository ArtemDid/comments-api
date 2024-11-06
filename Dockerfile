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

# Компилируем TypeScript в JavaScript
RUN npm run build

# Указываем порт, который будет использовать контейнер
EXPOSE 3000

# Команда для запуска приложения
CMD ["./wait-for-it.sh", "db:5432", "--", "npm", "start"]
