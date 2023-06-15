# Final Test

## Mô tả

Xây dựng trang web ( tương tự Pinterest ) có khả năng hiển thị và tương tác với các NFTs

## Yêu cầu

- Kết nối ví Metamask
- Hiển thị các NFT Contract ở trang Home.
- Hiển thị các NFT User ở trang Profile.
- Biến link ảnh thành Link NFT (Database có thể lấy của người khác hoặc tự tạo).

## Thời gian thực hiện

01/06/2023 - 15/06/2023 (6 ngày)

## Cấu trúc thư mục

Cấu trúc thư mục được tổ chức theo mô hình phân loại (by kind), nghĩa là nhóm các file code có các functions có cùng chức năng lại với nhau.

### Public

Thư mục public là một thư mục đặc biệt dùng để chứa những tài nguyên tĩnh như là các icons, hình ảnh và font chữ, file javascript, file root html,...

### Src

Thư mục src chứa source code của trang web.

- **Components**

    Thư mục components chứa các file định dạng các components mà những component này có thể được tái sử dụng ở nhiều trang trên web app.

- **Connectors**

    Thư mục connectors chứa các file dùng để định nghĩa khởi tạo các connector tới contract như Metamask, Coinbase, WalletConnect

- **Contracts**

    Thư mục contracts chứa file có chức năng khởi tạo contract, các method được sử dụng để tương tác với contract.

- **Layouts**

    Thư mục layouts chứa các file định dạng layout cho một trang. Những layout này có thể tái sử dụng trong nhiều trang khác nhau.

- **Pages**

    Thư mục pages chứa các file định dạng một trang web cụ thể. Trong thư mục này, mỗi trang Web là 1 thư mục cụ thể và có thể gồm nhiều components, hooks, features,... riêng chỉ có trong trang đó.

- **Redux**

    Thư mục redux chứa các action, store và reducer được sử dụng trong các trang.

- **SCSS**

    Chứa các file SCSS dùng để tái định dạng lại các style sẵn trong bootstrap.

- **Utils**

    Chứa các file định nghĩa những action phức tạp và có thể tái sử dụng ở nhiều trang.

## Các chức năng đã thực hiện

- Connect và disconnect ví Metamask.
- Kết nối với Infura để có thể xem các NFT trên Contract khi không có ví Metamask.
- Hiển thị các NFT đã được mint và chưa được mint trên trang Home.
- Infinite scroll trang Home.
- Hiển thị các NFT mà User sở hữu trên trang Profile.
- Mint các NFT có thể mint.
- Hiển thị thông tin của từng NFT.
