import React, { useState } from "react";
import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Card,
  Dropdown,
  Space,
  Button,
  Row,
  Col,
  Image,
  Descriptions,
  Tag,
  DatePicker,
} from "antd";
const { RangePicker } = DatePicker;
import { Link } from "react-router-dom";

const items = [
  {
    key: "1",
    label: "Mới nhất",
  },
  {
    key: "2",
    label: "Cũ nhất",
  },
  {
    key: "3",
    label: "Theo Ngày",
  },
];
const itemsdes = [
  {
    key: "1",
    label: "Tên dịch vụ",
    children: "Trị mụn",
  },
  {
    key: "2",
    label: "Tên khách hàng",
    children: "Trịnh Trần Phương Tuấn",
  },
  {
    key: "3",
    label: "Nhân viên thực hiện",
    children: "Thiên an",
  },
  {
    key: "4",
    label: "ngày thực hiện",
    children: "20/10/2021",
  },
  {
    key: "5",
    label: "Giá tiền",
    children: "500.000đ",
  },
  {
    key: "6",
    label: "Ghi chú",
    children: "Khách hàng đã trả tiền",
  },
  {
    key: "7",
    label: "Góp ý của khách hàng",
    children: "Khách hàng rất hài lòng với dịch vụ",
  },
  {
    key: "8",
    label: "Trạng thái",
    children: <Tag color="#87d068">Hoàn thành</Tag>,
  },
];
function HistoryService() {
  const [selectedItem, setSelectedItem] = useState(null);

  // Hàm xử lý khi click vào một mục
  const handleSelect = (key) => {
    setSelectedItem(key === selectedItem ? null : key); // Toggle mở rộng / thu nhỏ card
    console.log("Đã chọn mục", key);
  };

  // Hàm để ngăn sự kiện nhấp vào ảnh kích hoạt onClick bên ngoài
  const handleImageClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện lan ra bên ngoài
  };

  // Hàm xử lý khi đóng preview
  const handlePreviewClose = (e) => {
    e.stopPropagation();
    // Không ảnh hưởng đến trạng thái `selectedItem` khi đóng preview
  };

  return (
    <Card
      title="Lịch sử dịch vụ"
      extra={
        <Link to="/admin/user">
          <Button type="primary">
            <LeftOutlined />
            Quay lại danh sách
          </Button>
        </Link>
      }
    >
      <Row className="mb-3" gutter={[16, 16]}>
        <Col span={4}>
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ["3"],
            }}
            className="w-100"
          >
            <Button>
              <Space>
                Bộ lọc
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Col>
        <Col span={6}>
          <RangePicker />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {[...Array(8)].map((_, index) => (
          <Col
            key={index}
            // span={selectedItem === index ? 24 : 6} // Thay đổi span khi chọn
            xl={selectedItem === index ? 24 : 6}
            lg={selectedItem === index ? 24 : 8}
            md={selectedItem === index ? 24 : 12}
            sm={selectedItem === index ? 24 : 12}
            xs={selectedItem === index ? 24 : 12}
            style={{
              transition: "all 0.3s",
              cursor: "pointer",
            }}
          >
            <Card>
              {selectedItem === index ? (
                <Row>
                  <Col span={12}>
                    <div>
                      <h3 className="text-center">ảnh trước</h3>
                    </div>
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn_Xgbj3ttSp67uP-D-m0014pQH7gfLvrMgg&s"
                      alt="service"
                      onClick={handleImageClick}
                      width={"100%"}
                      height={300}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <div>
                      <h3 className="text-center">ảnh sau</h3>
                    </div>
                    <Image
                      src="https://fedudesign.vn/wp-content/uploads/2020/09/beautiful-young-asian-woman-touching-her-clean-face-with-fresh-healthy-skin-isolated-white-wall-beauty-cosmetics-facial-treatment-concept_65293-3414.jpg"
                      alt="service"
                      onClick={handleImageClick}
                      width={"100%"}
                      height={300}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                  <Col span={24} className="text-center">
                    <Descriptions
                      style={{
                        marginTop: "20px",
                        marginBottom: "30px",
                      }}
                      layout="vertical"
                      contentStyle={{
                        color: "black",
                        textAlign: "center",
                      }}
                      bordered={true}
                      title="Thông tin chi tiết"
                      items={itemsdes}
                    />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <img
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIWFRUWFhUXFRUVFRUVFRYVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0mHh0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYBBwj/xABGEAABAwIEAwQHBQUFBwUAAAABAAIDBBEFEiExBkFRE2FxkSIygaGxwdEHFEJS8CNicpLhFTNTgoMWF0Oy0uLxVGSjwsP/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMABAX/xAAsEQACAgICAQMDAgcBAAAAAAAAAQIRAyESMUEEE1EiM3Ey8BQVQmGBkbEF/9oADAMBAAIRAxEAPwDRTNDgWkXBWKq+EJc57Msyk6XJBHdstjnS7ZcFnq0ZKn4MnO72DzPyRo4Fk/xW/wAp+q1dLOjGvumTFZ5/NwXUA2aWO9pHyTP920zzd07G9wa53zC9KYFICtyFezBU32c5d6gn/T/7kfH9nzec7v5QtmyynBWsDbRi/wDd8z/Hf/K1Nd9nw5Tn2sB+a3KR9yNg5MwZ+z//ANx/8f8A3Kvr+CJ2C8bmydw9F3sB0PmvSWapsoshyDbPFJoXMJa9pa4bgix8lGvTuK6FksDyQMzAXNdzFtbX6FeZpk7HG2XLJ1krIhGWSsnWXCsYYWqvxMKzVdVC7rIoDJqVvopwYu04UjQgYiNODyUMlCCjwErImoo5sN7kFLSELU5VG+AHkjYjgjKtkc1Fw1nVWc+Hgqvnw4jZG0LxkiX70FxB/dXLq1I3JnsxKgmcpHoeS65DqQ+Kpsr2mluAsyOiPo6m2iKZpx0aCSWwRNO0EKllnu1WWHz3CN7JtaD8qTzYLoKjqmnIQOhTCE0ElwqXHcbbG+OHMMzyTb91u5PtsPahMUxoUsGZ2rjy6k7BebtqZJagSyOuXOA/hBOgHclk9UXx4lds9qonXAKfVbKKjd6I00soq2WwR8EGvqM9xLM7sXhv5Tfw5+668+XrdFRiRjiRfNcezZeZ49RCCd0Q2FiL72KeK0Pe6AFyy6kmMcXCupLBGqvYLvKPl0BQdE3UlYVksKkaom7qZiIUSBJILqBhJWXQugImGlqa6NTWXC1YwN2ASRGVJYxuFBKFGydPMoXMVoHdun67rkjgV2B19FhhzKrRF4biNnZSVU1lOQczVXSVLwb2Fxsb2Qsbho9LhmujmC4WcwCuEjQe5X8Ml9hdNF2c840edceUD21DSNWPF29A4aOHwPtRPBuAiV/aSi7Iz6II0c/e57h8fBaviOh7WLb0mkEd3I+4o/DKQRRta3kPM8z5pq2Pz+gIcQAs/ilZa6KxLEA24usFjuKufdrNjo493MBJKV6Dixu7Z6dhBAYAOgVRxhwoyrbnb6MrR6LvzD8rvryUXBlfngZc6tGU9dNFqWvurRlaOfLFxkeEVNJLES1w2NiOYULaobHQ969W4vwB0oMsIvI0as/xAOQPJ3ReZkxS3BGVwuCDoQRuD3pgKRGHBJRVGGPZqw3HRB/fC3RwIPetQ3JBVW6zU2jGiFqasGwRsBGULB7ZG/1lOxDSH0kQwrBRIF0Li6sEcE4JrU8LAOpWXUljCSTO0SRNZaNqEnVoG7gPE2WHkq5Hbvd52+CGc2+5v4pfbA8/wjZ1HEMLfx3PRougRxdlcC2O4uL3Otudgsv2YSc1MscSbzTZ602ZssYew3DgCCg56bmsJhGLy0/qm7Tuw7eI6Fa2lx6OUWvld+V2mvceajLG0dOPMmW2Cz5H5SdD8Vt8MqNLdNF53mv5/BWdLjDmW67X6pE3ErOKmjc4lO1rHHc22G5PIeKkhd6F+5ZPCcQM1Q1rzZpGnXNqTf2DT2q+krGskdHrYW0JFwCLi9v1qkWWTybWibxJLinb7MlxA1znOuSOVvf81l2vs6zv/K1GL1gMj+mYjy0+SzmJuJFmxl99rNJIPiAmrZeL+kKwfEjBJl/A7Udx6L0TD8SDhuvNKKAmP9qxzeuZpC5hvEIhflc4ll9+iapXaJz4SW2exRSgrD8f8EdvepphaYavYNO1A5jo+3mj8H4jhksGysJPLMAfIrUQVAIVYyOOcK6Pn6mxGSM2NzbQg7gjcEK0ZUwzCzgAVsPtD4NM2appm/tbXkjH/Et+Jv7/AMfFeQtqje1tvYQRuCOqf8C9F7X8OH1onX7lWPkkjNnAj4Kaix5zDa9x0KvYcQhmFngX70fyBf2M3HXa6lHw1oPNS4jwwHelE72clm6mimiPpA+PJHin0bm12apkwKlaVkoK5w3VnTYh1QcWh1kTL0J4VdFiARUdUCgPaCQmVD7NK62QKurZy45QgjSdIi7dJLsgkmI8mVDmlNsVZ9gr3A+CKurBdFHZvJ8l2NPc02138EU7FejJMapezC3rvsmrrA54B1Gd2ntyrGcQUH3STsnSxSSD1hE4vDD0c6wGbfQXtzTUwckCWso3zD2/NOgoHyOAbc32HP3LfcN8BDR1Qbj8g/8As76JZNLseKcujJ4O+qkOWAPfysBcDxJ0C3OF8L1bxeZ0bP4buPusPettQYeyNoaxoa0bACwRrWqLdl19JQYRwyyGVkjnOlyuuWvtkOlvVA5bi/QK0kwOm7R0jIrZje1za/cL2A7kcAmS1DW7n6oeKNbu0Rx0EbfVY0eACnEAXIKlrtijGtumSElJoosUwzONNuiqafhKI6uYD4gFbF0age2yz0blZRN4XpgNIg09W3afduiaagdFYMeS38rre4j6KyzBNL+iD2FNolikvoVhePuBG1BdPTWbPa72aBsvQ/uv79jz6rbxx3UstOBuNevPzTRbBJI+VqmmcHlrgWuaSCCLEEGxBHIrsdQ5i9n4q4KNRP20RZdws8OJFyNA4EA3NtD4BZ/EuAKgN0hDu9jgT5GxVFkTIPG10ZHDMccNj7CtRh+KQy+jIAD3qjruGuyabhzXDkRY+SzTpJGHmtp9Gtrs2+McNsd6URt3cln5cMkZoW+SWHYrKNAT7VoqR1RILinkcOoa63nZbYVRmRERyKkYH8gVpKkPaLuhe0DclpFvFVb5weSA2vA2EutZTPAYLk6qHt+iGmhc7W6Foztknbrih+7uSRsB7uMIpxMJfu0T3D8wFj3kbE95BWmGJCw9C3+YfRZeXEmhUeLcYwwAkuHgNSfAc1OOVx0jofpue2E/azxPNFTBlPdnaOySSh1nNBBNmEDS+ozbjlvdeUcPYAZ3gW0G56a31VniWOzYjIIx6Mdwbczro53TwW0wGgZE0MYNNbnmXbEn3p5ZJJb7JLDG9dBWDYFHEAGtAtqdNSbaXPNaOGOyhgbsiWqDZYlaE8Jl1QcSYz2bcjD6Thv0G3n/AF6IxF7JcZ4gDLxxek/mbiw9l7uPh5qsw6nnldnffXr8uY80uHcBcfTfpfa/9Vr4acMGiel5ByrSI6GiDArCLRDuemiostySEabLAoSdyf8AeBbdQSG60pAhHewd7lGZFOY7oCQ2eAp2dEVZc0YsMx2CpKnieF8hY14cQbHKQba21UnEzZJKGdkJIkMbsmU2cTa9mnkSLgeK8X+z3BJZahsjLiOM+m8gtH8He6/lrtoqf02mLj48/qR6piVa5s0GV1rl4cOos2y0bZ2AG5Asq1sOXXcoSoLnEpIp3Z0xxe7+EWdU6mmGSTK4fvNPuJGnmsljX2fx6vgFxvlJv/KeaKqZAz9XTsJxd7TYAkX1bbTxHQql0yuT/wA1uHKD/wBk/CP2eRMImqGBx/Cw6gd56legR07WiwaAOllT4Zi7dGk6Hv2V6CumDTWjwssJRdSAqvDIpAQ5gIO+ixmK/ZZTSXMTnRHoDdvkfkvQbLlkzSYik10eIYl9m1XFcsyyju9F3kdPes1V0csJtLG9h/eaQPPZfSllDUUccgs9gcO8BTeJPoqsz8nzV2gSX0F/spR/+nj/AJQkl9l/I/vr4PIuLnVFNcyOzN5aBuvLUe3yPS685bI6Rxc4km/VelfbhVuMjWNa4RgZi/KcjnO5B1raAa68+QXnmDx5nNbe4vc2/X69qNRj0F5JT0zbcK4eGML7anX9exbPCRpf2fP5qhpiGsDRpt9Lq/w3Ro9v9PkuSTt2dcVSovYlMCho36J+dKAbiFWGMLjyCzWCUZqJTK/Vt9L87fr3o/iR37MjqR8QjeGW2ib3gJ4szVIv4Y7BSFiaxy5LMALqlohs5KAAsbiGOvkl7GlbnLTaR5JETPEj1j3D3JYliklZK6mpnWjbpPMPw9Y2Hm8jy8r3mF4THBG2ONtmj3k6kk8yTzSyaKRVdgeEUkoOaWQvcegysHXK25PmSr9rFyGKyna1KkGUhrQqLFzlfm5LQ5UPU0wduEZR0bHNKVlPDXi26Ihivra3ciIqBjTcNCJbGkimPOa8AskeiztZUkEAc7+7ZaXEDlYSsnM3Obb6fH9e9VWkdnoa22QQw53Znaj9HRXNNhT3WNso5BGYRhtrFw22CvWsRSG9T69p1Ap48LaN1bUNR2fouN28jzb9QmOCY5ZScXaPNySll/Uy7aeYTgqWKVzfVNu7l5ImPECPWF+8aHy/8K6yp9nHLDJdFkko4Zg4XB+o8VIqEhLq5dJExn3TBVk+EUshzOgiLvzZG5v5gLoEYk0/iCdFWjqvM5nrLESVHDdM69rs0t6LtOY2N+q4/Cyxt2Oz217/AOqJo8RYD6Vj0urH+0oz+FqokpIV8o+Chp6gEaIrMqqkkDnvLdi99v5jt5HzVmCpMYrccaXM8LH3qwwVtmNHQaeHJNmjzaIqijyiyMWaXRYNegcTBeMgNr6X6dUW1Rkao3omuyLC6BkLBHG0AD3k6knqSVYxxpsTUWxqMVYspDQxSBicApGhWUSTkR5VxzFNZcITcRbBHMXLIh7VC4JGqHTsqOIiRHoCfDU9NkJhOH29J2+9lfSsBGqa2OyVrZeGVqHFHY1LmUa6CiRYiFzs09oUrWopWZyogLE0hTPKge4IsKdnGTmN2bzHUc1erM1cosrmhqx2bM2not15bBVxPwRzx6YbZdTO1b1CSqcx8scY4lLFWziOZwaJZMoabMDc5s0N2029iEpeKqpo/vb9MzW/IBXnGXBFeaiaVtM+Rjnuc0scJDY/u3zX7rabBY59JJG4Mkjex52a9rmO8nC6k4wl8HVGeSPlmqp+LqoDURuvsC06+GpWjpamokizvyxNPKMuzaC51Js3ccufJZ7A6HTO7Uj4NAuB0G/kVfuq7NdHfo4eFrOsouC8I6Vln5Zp8EcBHGByawabXaLfMK9BWJwWrtlby1t4t5eVhdbCKS4ChNUUiFMRUYQkRRTSlRmSlyawpjiuNcsKkHxuRTHKvieiGOVYsnJBgcpGuQrXqQOVVIi4hGZIlRBy7mT2LQ4qNwTrrl0GFET2qIoh6icEjGTI7pXSKY5yQclzJGRDOkQ8tRZHkFQsKkkQFRUW5oOoxCyAdUOeUrkWjAnqasuNvNb6kYOzZp+Bv/KF51lsvSIdAG9AB5CytgfZy+q8C7IdB5LqkuuLpOMohM0oaupo5WlkjWvadC1wDmn2FZ9mKDqo3Ygb7lec8h6qwhZ4QpLEMYWX/I93PnYkj3LMYv8AZtIdaepGmobIzruM7OX+VaN2L5RurOlexzQTI6/cQB8FSEr6BLHXZ5VJSz0kobMzKCRZzTmYXt0dZ3nobGwvzW2w6a7UuNRH90k1vbtCCeRaQ5p8yqPAa70WnqB5pcm1Y0KWjWRvRTXKqhmRjJFFMdoLLlzMh+0XQ9FsFBbHomORVzHqeORFMDRYsepWvQLJFMx6omRlEMDk66Ga9SB6omTaJrrl0zMuZlrBQ8lRvK4XKNzkrYyQ171A96e8oWRyRlIobLKgJ5LqSaRRCyVsqkQNp77qXswE8yKJ70A7IydQtHQY+Nnj2hZto1T1PJmljacRJY4z0zaf2xF+dJYtJb+YT+ES/hY/JTVPBbm37KeRoPLMSPZfZVT+EMQbqysJ7ntY74i62U9Z3qRlbpe6pyOq3+9f8MFLQYrGNY4ph3EscfO4VbU8VVNMcktLLGeQJa5p65Tpf2Fev0uRzbl5uehCz32jwx/c5LkFzWue0m1w5mo+ntKtGK8oSWSXSf7/AMnlGNcWTVTBHlLGZruJ3dcizbctuqt8Hr7Ma32eGu/ht5rGVFZmsNP6lXeFz+iB7R37/X3K04KqRyRytytm+w/EOV9ldwVVwvPaWrIN/b+vL3q7o8Qta+1tfquScKOyE1I17ZU8PVTTVQdsUcyRTHoJEikZOhMy60oWaiyjmRLJFVxuRUciomI0WLXqRr0A2RStlTJknENEiXaIPtUjKmsHEJc9RPkUDpVE+VBsZRJnyoKeZMlnQcsqVsoojpJlH2qiIJU8MSUJ0XKkaxTRQKdsCwLBOzSLO9HiBRy010mSHJAsBskiPurkly+1P4G5ITeH8wuL+ar8SwyaFpLW57Da5Hv1+C11JPleP3tx8Crx0LXDUL2I44SXRyZM04Ps+fXcf9i8xTQSxOadQHMkbvuMwabeCoOLeMTVNEbAWs1zOOhdtoG3Nhp1XoP22cGDshXRCxjs2UAbxuIaD35XEadCV42aO3rO0t+Uj3qixxRN55tdgYfqrenqLWF9gFTP302U0ZOickmaShqb28fif6e5XNJMbefge74rNUDdR1utLRwm1u9c2Vo7cKZdUVRlV/Tz3WRa1wO36CucPn/XRc8kdKL9j1NdBxPupw9TMEBykbKgi9LtUbBRZNlTxKqxs6lbMipAaLDtUjKgRKl2qawUFPlQ8kyidImEoWFI6511xsaexiJiiWNZHFCjIYFJFEimMRSEchscSnZEnMapmhOkSciMRKGqe2Npc4hrQLknYBTVlUyJhe92VrdST+tT3LzXiHHXVLuYjabsb39XDmeXQXNuprjxcicslGp/2npvzH+UpLzzP3n+cfRJX9iBL3ZHrtAwvkbc2tb6rTAqslw62o3COgkuNVoLjoXJPlsdVQMlY6ORocx7S1zXC7XNcLFpHMEFfP8A9ofCRw6TM1pdRvPoOvd0LyT+zcSSS3QWcfAm41+g0Fi2HxzxuilYHtcCC07H+vfuE5NHyVUxD8Puyi/koIYzf9HzW3454AnonF8AdNAba+tI0k2sR+Ju2o669U/hPhIGNtRVaNIDmtdoLH1S7x5Dv8p5JqKtnRhg5yoB4cw8yHNY67HW2+wJWziw/KNv1+vgpDXtYP2URcBYA2AB15c1A/GvQLnxua0EAne1za5A71wSlez1I4+Kocaf9e36EpzaexuN/iOhUNNibAQSbsJ9Ya9d+is6p8Y1ztAOtydElhaZLTORBKr4TfVpDgdiDcIgXWsVokcUxzlzVNIWCOD10SqIhcCAKCBInZ0OCnsCNgoIaVMxRQsujoYkRWOhYjImJscaKjYnRNs6xqnY1JjVKAmSJNiASmmDGlziA1ouSdgBzXSV5zxlj7pn9jGf2LTqR/xHg7/wg7dSCdtrY4cmTlKgTinHnVMga24iafQHV35iOvTp4qnDSfZ367b6HT5+V+Em2tibWNtrcrW1+Z8lMIydLXtz58tL+73chftSpUjmbsl7M/nf5sSQ/at/MfJn1SWMfQ8mgJ6AlVDq8ZWkWuT6Q10GqtJ2Zmlt7XFrqB9A0hgJ0aCPG4tdKIBf2hILEsAa6wbc667X7l0Vzy0HK30nBrdTqdb38lN/Ze2Z5dl9Qcmnke9QOoi0MbnIy3sbbk9PogErsVqrsIcwZruBBOgsOvtWMx0aRtt+IF1thcGwXoU+GhwFnEHXXQkk7k3WQq8KGZzHE5r3BPQ7aLl9TG6O/wBHKmwXDI2FrrgWabX8N1FiNEwwSNaCcwABtoDe+58E6SidCS65LDqRa1r81c0EUckehJ05noudPwzrna+pdGEfgpa0OHtHsQrsDkkfkY0uvsO75LdVuRtmEG7r2sCRoOZGyrW4j2Dr28T3IPQyk2tBOE8LCGHK43eTmJGwvyCLpKK5IPLRT0uKh4HeiWygarUmSbl5B6jCgBdUs4AKdxhxF2ERyn03aNHf1PcFi8PxJ/M3PO6Eq8FIQk1s1osnABVVPWX5o6Ka6QLTC2MUzIlBG9GROWEZNDEjImKCNyIZInQjCY2IhgQzHohrkyJMmATlEHKt4gxhtNEXkjMfRYOrvoOf9VSO3SEein42x3IPu8Z9Jw/aEfhaRo2/InTvsf3gRgxa+/f3ePTYX8Lcr37Uyuc5zn+k5xu6/Mnx066bW7r3UDeRIN76AjXmPPfvtfoF3wioqjlk7Y6Pca8767Wv368v1ylc642FtL/Tlz+SiaNeu997HW4GnLT2p722BB269/lt8UwOiTM3ofI/RJQ/fv3Pef8AqSWAfQbVI1JJKIJyr8b/ALl/8J+aSSD6CuzlH6v+VvwCzuPf3zEklD1H2zq9L90gxH1PYq7hjd38RSSXE+0ekvtstanks1xN8voupLSExdoiwb1GK95JJJUPLs8545/v2fwn4qupuSSSz6KotqVW1MupJBZB0PJHxpJIkZBTERGkkmFCI0QxJJOich4WG+0X16f/AFPgEklfB+sjl/SZWT1vL/8ANSx7u/h+S4ku9nKiwd6zv9T5IMc/4R/ylJJEA1JJJYJ//9k="
                    alt="service"
                    width={"100%"}
                  />
                  <Col span={24} className="text-center">
                    <h3 className="text-center p-4">Tên dịch vụ</h3>
                    <h4>300.000đ</h4>
                    <p className="text-center">20/10/2021</p>
                  </Col>
                </Row>
              )}

              <Button type="primary" block onClick={() => handleSelect(index)}>
                Chi tiết
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default HistoryService;
