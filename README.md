# 🧪 Online Test - DTS 

**Bài test online do Công ty Cổ phần Công nghệ Truyền thông DTS tổ chức trong chương trình Fresher Developer 2025.**

---

## 🚀 Công nghệ sử dụng

- **Node.js** - Nền tảng chạy JavaScript phía server.
- **Express.js** - Framework xây dựng RESTful API.
- **MongoDB** - Cơ sở dữ liệu NoSQL.
- **Mongoose** - ODM cho MongoDB.
- **Docker** - Đóng gói và triển khai ứng dụng.
- **Swagger** - Tài liệu hóa API.
- **dotenv** - Quản lý biến môi trường.

---

## 📚 Table of Contents

1. [📦 Các phần mềm cần cài đặt](#-các-phần-mềm-cần-cài-đặt)
2. [⚙️ Cách cài đặt và chạy project](#️-cách-cài-đặt-và-chạy-project)
3. [🛠️ Các API chính](#️-các-api-chính)
4. [⚠️ Hướng dẫn khắc phục lỗi](#hướng-dẫn-khắc-phục-lỗi)

---

## 📦 Các phần mềm cần cài đặt

| Tên phần mềm      | Link tải                                                 |
|-------------------|----------------------------------------------------------|
| Node.js           | [https://nodejs.org/](https://nodejs.org/)               |
| Visual Studio Code| [https://code.visualstudio.com/](https://code.visualstudio.com/) |
| Docker Desktop    | [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) |
| MongoDB Compass   | [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass) |

---

## ⚙️ Cách cài đặt và chạy project

### 1. Clone repository
```bash
git clone https://github.com/DungBui130504/online-test-DTS.git
```
### 2. Cài đặt thư viện và biến môi trường

- Mở project vừa clone bằng Visual Studio Code.
- Mở terminal trong Visual Studio Code (nhấn Ctrl + ` hoặc Ctrl + J).
- Cài đặt các thư viện cần thiết, nhập lệnh:
```bash
npm install
```

- Tạo file `.env` trong thư mục gốc của project với nội dung sau:
```env
PORT=<server_port>
secret_access_token_key=<private_key_for_access_token>
secret_refresh_token_key=<private_key_for_refresh_token>
MONGO_SERVER=mongodb://mongo_db:27017/<your_database_name> # nên đặt: UserManagement
```

### 3. Mở Docker Desktop và MongoDB Compass

- Đảm bảo Docker Desktop đang chạy.
- (Tùy chọn) Dùng MongoDB Compass để kiểm tra dữ liệu sau khi khởi chạy.

### 4. Chạy project

- Mở terminal trong Visual Studio Code (nhấn Ctrl + ` hoặc Ctrl + J).
- Chạy lệnh sau để khởi động project:
```bash
docker compose up --build
```

- Truy cập các đường dẫn sau trên trình duyệt:
  - API Swagger UI: [http://localhost:3001/api-docs/v1](http://localhost:3001/api-docs/v1)
  - Mongo Express: [http://localhost:8081](http://localhost:8081)

- Khi truy cập Mongo Express, sử dụng thông tin đăng nhập:
  - **Tài khoản:** `admin`
  - **Mật khẩu:** `pass`
- Trên Mongo Express:
  - Tạo 1 database trùng với tên database trong file .env (nên tạo: UserManagement).
  - Tạo 1 collection trong database (nên tạo: Users).
  - Copy nội dung file Admin.User.json trong project và thêm vào collection để tạo dữ liệu mẫu.

 ## 🛠️ Các API chính

### /admin: quản trị viên server
- `GET /admin/allusers` - Lấy danh sách tất cả người dùng
- `GET /admin/auser/:id` - Lấy thông tin một người dùng theo ID
- `POST /admin/adduser` - Thêm người dùng mới
- `PUT /admin/updateuser` - Cập nhật thông tin người dùng
- `DELETE /admin/deleteuser/:id` - Xóa người dùng theo ID
- `PUT /admin/restoreuser/:id` - Khôi phục người dùng đã xóa

### /user: người dùng chưa có tài khoản hoặc chưa đăng nhập
- `POST /user/register` - Đăng ký tài khoản
- `POST /user/login` - Đăng nhập
- `POST /user/logout` - Đăng xuất
- `POST /user/renewtoken` - Làm mới access token

### /client: người dùng đã có tài khoản và đã đăng nhập
- `GET /client/getyourinfor` - Lấy thông tin cá nhân
- `PUT /client/updateyourinfor` - Cập nhật thông tin cá nhân
- `DELETE /client/deleteyouraccount` - Xóa tài khoản cá nhân

 ## ⚠️ Hướng dẫn khắc phục lỗi

Lưu ý hãy làm đúng và đủ các bước theo hướng dẫn.  
Hướng dẫn fix một số lỗi:

- Không build được mongo image: hãy thử chạy lệnh sau để tải thủ công image Mongo rồi build lại project:
  ```bash
  docker pull mongo:latest
  docker compose up --build
  ```

- Nếu không vào được các đường link [http://localhost:3001/api-docs/v1](http://localhost:3001/api-docs/v1) hoặc [http://localhost:8081](http://localhost:8081), hãy làm như sau:
  1. Truy cập `chrome://net-internals/#hsts` trên trình duyệt Chrome.
  2. Tại mục **"Delete domain security policies"**, nhập `localhost` và nhấn **Delete**.
  3. Chi tiết lỗi xem tại: [https://stackoverflow.com/questions/25277457/google-chrome-redirecting-localhost-to-https](https://stackoverflow.com/questions/25277457/google-chrome-redirecting-localhost-to-https)
