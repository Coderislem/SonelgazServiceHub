import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSideBare from '../admin/AdminSideBare';
import AdminHeader from '../admin/AdminHeader';
import ChefajounsSideBare from './ChefajounsSideBare';

function ChefAjounsDashBourad() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const chafAjence = localStorage.getItem("chafAjence");

        if (!token || !chafAjence) {
            navigate('/adminlogin');
        }
    }, [navigate]);

    return (
        <div className="flex justify-between">
            <ChefajounsSideBare />
            <div className="flex-col w-full">
                <AdminHeader />
                <div
                    style={{
                        border: "1px solid transport",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        margin: '40px'
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ChefAjounsDashBourad;
