# Используем Node.js образ как базовый
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт, если потребуется
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "index.js"]
