import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef(null);
    const passref = useRef(null);
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords);
        console.log(passwords)

    }

    useEffect(() => {
        getPasswords()


    }, []);

    const showPassword = () => {
        if (passref.current.type === "password") {
            passref.current.type = "text";
            ref.current.src = "https://i.postimg.cc/cCqB55Js/image.png";
        } else {
            passref.current.type = "password";
            ref.current.src = "https://i.postimg.cc/dQ5cwy7F/image.png";
        }
    };

    const savePassword = async () => {
        if (form.site.length > 6 && form.username.length > 5 && form.password.length > 6) {
            //if any password exists delete it first and save the updated one with new id
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "content-Type": "application/json" },
                body: JSON.stringify({ id: form.id })
            }
            )
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            await fetch("http://localhost:3000/", {
                method: "POST", headers: { "content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            }
            )
            // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            setForm({ site: "", username: "", password: "" });

            toast('Saved successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Failed to save password', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
    };

    const deletePassword = async (id) => {
        let confirmDelete = window.confirm("Do you want to delete this password?");
        if (confirmDelete) {
            const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswordArray);
            // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "content-Type": "application/json" },
                body: JSON.stringify({ id })
            }
            )
            toast('Deleted successfully!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        };
    }

    const editPassword = (id) => {
        const passwordToEdit = ({ ...passwordArray.filter(i => i.id === id)[0], id: id });
        setForm(passwordToEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


            <div className="absolute  -z-10 h-full w-full items-center  bg-custom-gradient">

                <div className="md: text-center justify-center">
                    <h1>
                        <div className="logo font-bold text-2xl">
                            <span className='text-blue-600'>&lt;</span>
                            Pass
                            <span className='text-blue-600'>OP/&gt;</span>
                        </div>
                    </h1>
                    <p className='text-blue-900'>Your own password manager</p>
                </div>
                <div className="md flex items-center:flex flex-col justify-center items-center px-5 py-5">
                    <div className="text-white flex-col p-5 w-full max-w-4xl"> {/* Adjusted for responsiveness */}
                        <input
                            value={form.site}
                            onChange={handleChange}
                            placeholder='Enter the URL'
                            className="w-full rounded-2xl m-2.5 h-11 border border-blue-700 text-black p-3"
                            type="text"
                            name='site'
                        />
                        <div className="second flex flex-col sm:flex-row justify-center items-center relative left-0 w-full"> {/* Adjusted for responsiveness */}
                            <input
                                value={form.username}
                                onChange={handleChange}
                                placeholder='Enter username'
                                className="w-full sm:w-1/2 rounded-2xl m-2.5 h-11 border border-blue-700 text-black p-3"
                                type="text"
                                name='username'
                                id='username'
                            />
                            <div className="relative mt-2 sm:mt-0 sm:ml-2">
                                <input
                                    ref={passref}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder='Enter Password'
                                    className="w-full sm:w-[200px] rounded-2xl m-2.5 h-11 border border-blue-700 text-black p-3"
                                    type="password"
                                    name='password'
                                    id='password'
                                />
                                <span className='absolute  right-[11px] top-3 cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} width={33} src="https://i.postimg.cc/dQ5cwy7F/image.png" alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className='flex justify-center items-center bg-blue-300 rounded-full px-3 py-1 hover:border-blue-500 hover:bg-blue-400'
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save
                    </button>
                </div>
                <h2 className='font-bold text-2xl text-center mt-5'>Your passwords</h2>
                <div className="passwords flex flex-col justify-center items-center mt-5 overflow-y-auto">
                    {passwordArray.length === 0 && <div>No passwords</div>}
                    {passwordArray.length !== 0 &&
                        <div className="overflow-auto  w-full max-w-4xl"> {/* Added overflow and max width for responsiveness */}
                            <table className="table-auto border border-black w-full rounded-2xl overflow-hidden mb-12">
                                <thead className='bg-blue-600'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-slate-500'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className='py-2 border border-black text-center'>
                                                <div className='flex items-center justify-center'>
                                                    <a href={item.site.startsWith('http') ? item.site : `https://${item.site}`} target='_blank' rel="noopener noreferrer">
                                                        {item.site}
                                                    </a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-2 border border-black text-center'>
                                                <div className='flex items-center justify-center'>
                                                    {item.username}
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-black text-center'>
                                                <div className='flex items-center justify-center'>
                                                    {"*".repeat(item.password.length)}
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-black text-center'>
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}
                                                    ></lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}
                                                    ></lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default Manager;
