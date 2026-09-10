# Сервис бронирования посещения квестов MyQuestHub

Сервис, позволяющий искателям квестов просматривать существующие квесты и управлять своими бронями, а менеджерам квестов - редактировать данные о квестах, просматривать брони пользователей и управлять их статусами.

---

## Стек технологий

- **Backend:** Django 3.2.16, Django REST Framework 3.14, PostgreSQL
- **Frontend:** React 18, Redux Toolkit 1.9, React-Redux 8, React Router 5, MUI 5, React-Bootstrap 2.7, Axios

---

## Требования

- Python 3.8+
- Node.js 16+
- npm 8+
- PostgreSQL 12+
- Microsoft C++ Build Tools
- Git

---

## Переменные окружения

### Backend
```env
DEBUG=True
SECRET_KEY=your_secret_key
ALLOWED_HOSTS=['localhost', '127.0.0.1']
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)
CORS_ORIGIN_ALLOW_ALL = True
```

---

## Установка и запуск

### Backend

### 1. Клонирование репозитория и установка зависимостей

```bash
git clone -b branchdz --single-branch https://github.com/DenisB0ndarenko/RIP_LABS.git
cd RIP_LABS\MQH
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
```

### 2. Создание БД и пользователя БД

```sql
CREATE DATABASE mqh_db;
CREATE USER dbuser WITH PASSWORD '123123123';
GRANT ALL PRIVILEGES ON DATABASE mqh_db TO dbuser;

\c mqh_db;
GRANT ALL ON SCHEMA public TO dbuser;
```

### 3. Создание и применение миграций

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Создание пользователя администратора Django

```bash
python manage.py createsuperuser
```

Для назначения роли менеджера квестов пользователю необходимо зайти в админку Django от имени пользователя администратора Django, создать группу "Manager" и выдать группе разрешения на управление пользователями, бронями, жанрами, организаторами, квестами и статусами, после чего добавить выбранного пользовтеля в эту группу.

### 5. Запуск сервера

```bash
python manage.py runserver
```


### Frontend

### 1. Установка зависимостей

```bash
cd RIP_LABS\my-app
npm install
```

### 2. Запуск сервера

```bash
npm run start
```
---

## Структура проекта

```
RIP_LABS/
├── MQH/                              # Django-бэкенд
│   ├── MQH/                          # Основной пакет проекта
│   │   ├── asgi.py                   # ASGI-конфигурация
│   │   ├── settings.py               # Настройки Django
│   │   ├── urls.py                   # Маршруты API
│   │   └── wsgi.py                   # WSGI-конфигурация
│   ├── MQH_app/                      # Приложение API
│   │   ├── migrations/               # Миграции базы данных
│   │   ├── static/                   # Статические файлы
│   │   ├── admin.py                  # Настройка админ-панели
│   │   ├── apps.py                   # Конфигурация приложения
│   │   ├── models.py                 # Модели базы данных
│   │   ├── permissions.py            # Классы разрешений
│   │   ├── serializers.py            # DRF-сериализаторы
│   │   ├── tests.py                  # Тесты
│   │   └── views.py                  # Представления
│   ├── manage.py                     # Утилита управления Django
│   ├── models.py                     # Модели базы данных
│   └── requirements.txt              # Python-зависимости
├── my-app/                           # React-фронтенд
│   ├── public/                       # Публичные файлы
│   │   ├── images/                   # Изображения
│   │   ├── index.html                # HTML-шаблон
│   │   ├── manifest.json             # Метаданные
│   │   └── serviceWorker.js          # Файл для PWA
│   ├── src/                          # Исходный код React
│   │   ├── components/               # Переиспользуемые компоненты
│   │   │   ├── Auth.js               # Компонент аутентификации
│   │   │   ├── BackButton.js         # Кнопка "Назад"
│   │   │   ├── BookingCard.js        # Карточка брони
│   │   │   ├── BreadCrumbsComp.js    # Компонент "Breadcrumb"
│   │   │   ├── LilQuestCard.js       # Маленькая карточка квеста
│   │   │   ├── Logout.js             # Компонент выхода из учетной записи
│   │   │   ├── ManagerMenu.js        # Компонент меню менеджера
│   │   │   ├── MngrBookingCard.js    # Карточка брони режима менеджера
│   │   │   ├── NewBreadCrumbs.js     # Новый компонент "Breadcrumbs"
│   │   │   ├── QuestCard.js          # Карточка квеста
│   │   │   ├── Registration.js       # Компонент регистрации
│   │   │   └── SearchAndFilters.js   # Компонент поиска и фильтрации
│   │   ├── pages/                    # Страницы приложения
│   │   │   ├── AddQuestPage.js       # Страница добавления нового квеста
│   │   │   ├── AllQuestsPage.js      # Страница с карточками квестов
│   │   │   ├── BookingsPage.js       # Страница броней пользователя
│   │   │   ├── EditQuestPage.js      # Страница редактирования квеста
│   │   │   ├── HomePage.js           # Домашняя страница приложения
│   │   │   ├── MngrBookPage.js       # Страница менеджера с бронями пользователей
│   │   │   └── QuestPage.js          # Страница квеста
│   │   ├── App.js                    # Корневой компонент
│   │   ├── index.js                  # Точка входа
│   │   ├── myRequests.js             # Запросы приложения
│   │   └── store.js                  # Хранилище состояния
│   ├── package-lock.json             # Фиксация версий
│   └── package.json                  # NPM-зависимости
├── .gitignore                        # Игнорируемые файлы
└── README.md                         # Файл "README"
```

---

## Документация API

Swagger UI: http://127.0.0.1:8000/api/docs/
ReDoc: http://127.0.0.1:8000/api/redoc/

### Основные эндпоинты

Базовый URL: http://localhost:8000

| Метод | Эндпоинт | Параметры | Описание |
|-------|----------|-----------|----------|
| POST | `/add_user` | - | Регистрация |
| GET | `/allbookings` | - | Получить список броней всех пользователей |
| GET | `/allbookings` | `status`, `start`, `end` | Получить список броней всех пользователей с фильтрацией по статусу и диапазону дат |
| GET | `/bookings` | `user` | Получить список броней пользователя user |
| POST | `/bookings` | - | Создать бронь |
| PUT | `/bookings/{id}/` | - | Обновить бронь |
| GET | `/quests` | - | Получить список квестов |
| GET | `/quests/{id}` | - | Получить квест |
| GET | `/quests` | `name`, `max_cost`, `min_cost` | Получить квест с фильтрацией по названию и ценовому диапазону |
| POST | `/quests` | - | Создать квест |
| PUT | `/quests/{id}` | - | Обновить квест |
| DELETE | `/quests/{id}` | - | Удалить квест |
| GET | `/questsma` | `manager` | Получить список квестов с подробной информацией |
| GET | `/status` | - | Получить список статусов броней |
