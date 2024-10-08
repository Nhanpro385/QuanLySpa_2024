<?php

namespace App\Repositories;

interface BaseRepositoryInterface
{
    public function all(); // Lấy tất cả dữ liệu

    public function find($id); // Tìm theo ID

    public function create(array $attributes); // Tạo mới một bản ghi

    public function update($id, array $attributes); // Cập nhật một bản ghi

    public function delete($id); // Xóa bản ghi

    // Phân trang dữ liệu
    public function paginate($perPage = 15);

    // Lọc dữ liệu dựa trên điều kiện
    public function filter(array $conditions);

    // Xuất ra JSON với dữ liệu tùy chỉnh
    public function toJson($data, $statusCode = 200);
}
