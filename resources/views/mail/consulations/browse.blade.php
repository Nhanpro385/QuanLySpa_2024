<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        /* Reset styles for email clients */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }

        table {
            border-spacing: 0;
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        td {
            padding: 20px;
        }

        h1 {
            font-size: 20px;
            color: #333333;
            text-align: center;
        }

        p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px auto;
            text-align: center;
        }

        .button:hover {
            background-color: #0056b3;
        }

        .footer {
            font-size: 14px;
            color: #999999;
            text-align: center;
            padding: 10px 0;
            background-color: #f4f4f4;
        }

        @media (max-width: 600px) {
            td {
                padding: 15px;
            }

            h1 {
                font-size: 18px;
            }

            p {
                font-size: 14px;
            }

            .button {
                padding: 10px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <table>
        <tr>
            <td>
                <h1>Thông báo KHÁCH HÀNG YÊU CẦU TƯ VẤN TRỰC TUYẾN.</h1>
                <p>
                    Yêu cầu <strong>SPA SAKURA</strong>. Tiếp nhận yêu cầu tư vấn trực tuyến
                    từ quý khách <strong>{{ $full_name }}</strong>. Xác nhận chuyên gia tư vấn trong buổi trò
                    chuyện.
                </p>
                <p>
                    Nhấn vào nhút bên dưới để đến với trang danh sách yêu cầu tư vấn cho khách hàng.
                </p>
                <p style="text-align: center;">
                    <a href="{{ $url }}" class="button" style="text-align: center;">
                        Duyệt ngay
                    </a>
                </p>
                <p>SPA SAKURA đồng hành cùng quý khách.</p>
            </td>
        </tr>
    </table>
    <div class="footer">
        Trân trọng, <br />
        <strong>SPA SAKURA</strong>
    </div>
</body>

</html>
