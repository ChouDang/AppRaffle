// Interface cho từng thuộc tính của một Attribute
interface Attribute {
    Name: string;
    Value: string;
}

// Interface cho thông tin người dùng
interface User {
    Username: string;
    Attributes: Attribute[];
    UserCreateDate: string; // Dạng ISO 8601
    UserLastModifiedDate: string; // Dạng ISO 8601
    Enabled: boolean;
    UserStatus: "CONFIRMED" | "UNCONFIRMED"; // Các trạng thái có thể là CONFIRMED hoặc UNCONFIRMED
}

// Interface cho danh sách người dùng
type UsersList = User[];