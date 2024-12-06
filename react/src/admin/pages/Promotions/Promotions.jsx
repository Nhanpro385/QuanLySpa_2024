import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { FireOutlined } from "@ant-design/icons";

import PromotionTable from "../../modules/promotion/compoments/PromotionTable";
import { useNavigate } from "react-router-dom";
import usePromotionActions from "../../modules/promotion/hooks/usepromotionAction";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
function Promotions() {
    useEffect(() => {
        document.title = "Quản lý chương trình khuyến mãi";
    }, []);
    const navigate = useNavigate();
    const { getPromotions, deletePromotions } = usePromotionActions();
    const [PromotionsData, setPromotionsData] = useState([]);
    const promotions = useSelector((state) => state.promotions);
    const pagination = promotions?.promotions?.meta || {};
    const [searchquery, setSearchQuery] = useState({
        search: "",
        page: 1,
        per_page: 5,
    });

    useEffect(() => {
        getPromotions();
    }, []);
    useEffect(() => {
        if (promotions?.promotions?.data && !promotions.loading) {
            setPromotionsData(
                promotions?.promotions?.data.map((item) => ({
                    ...item,
                    key: item.id,
                }))
            );
        }
    }, [promotions]);

    const handleEdit = (key) => {
        navigate(`/admin/khuyenmai/chinhsua/${key}`);
    };

    const handleDelete = async (key) => {
        try {
            const res = await deletePromotions(key);
            if (res.meta.requestStatus === "fulfilled") {
                getPromotions();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleAdd = () => {
        navigate("/admin/khuyenmai/them");
    };

    return (
        <div>
            <h1 className="text-center">Quản lý chương trình khuyến mãi</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <h2>Danh Sách Chương Trình Khuyến Mãi</h2>
                <Button type="primary" onClick={handleAdd}>
                    <FireOutlined />
                    Thêm mới chương trình
                </Button>
            </div>

            {/* Promotion Table */}
            <PromotionTable
                pagination={pagination}
                dataSource={PromotionsData}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default Promotions;
