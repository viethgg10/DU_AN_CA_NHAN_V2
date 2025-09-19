// src/components/RegistrationForm.tsx
"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface RegistrationFormProps {
    email: string;
    onClose: () => void;
    onSuccess: () => void;
}

const RegistrationForm = ({ email, onClose, onSuccess }: RegistrationFormProps) => {
    const [formData, setFormData] = useState({
        email,
        name: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Đã xảy ra lỗi khi đăng ký.');
                return;
            }
            onSuccess();
        } catch (err) {
            setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-4">Đăng ký tài khoản</h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            required
                            minLength={6}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }
                            required
                            minLength={6}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;