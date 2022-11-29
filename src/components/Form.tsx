import React, { createRef, useState } from "react";
import { fetchPostUsers } from "../features/usersPostSlice";
import { useAppDispatch } from '../app/hooks';
import '../styles/Form.scss';
import { IUser } from "../interfaces/user";


export default function Form() {
    const [disabledBtn, setdisabledBtn] = useState(true);
    const dispatch = useAppDispatch();
    const form = createRef<HTMLFormElement>();
    const [formState, setFormState] = useState<IUser>({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        phoneNumber: ''
    });

    const [ageclassName, setageclassName] = useState('inputEqualWidth');
    const [firstnameclassName, setfirstnameclassName] = useState('inputEqualWidth');
    const [lastnameclassName, setlastnameclassName] = useState('inputEqualWidth');
    const [emailclassName, setemailclassName] = useState('inputEqualWidth');
    const [phoneNumberclassName, setphoneNumberclassName] = useState('inputEqualWidth');

    function submitData(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(fetchPostUsers(formState));
        setageclassName('inputEqualWidth');
        setfirstnameclassName('inputEqualWidth');
        setlastnameclassName('inputEqualWidth');
        setemailclassName('inputEqualWidth');
        setphoneNumberclassName('inputEqualWidth');
        form.current?.reset();
        setdisabledBtn(true);
    };

    function changeState(value: string, field: string) {
        const clone = { ...formState };
        clone[field as keyof IUser] = value;
        setFormState(clone);
    };

    function handleFirstName(event: React.FormEvent<HTMLInputElement>) {
        if (!/^[a-zA-Z\s]+$/.test(event.currentTarget.value)) { setfirstnameclassName('redBorder'); }
        else {
            changeState(event.currentTarget.value, 'firstName')
            setfirstnameclassName('inputEqualWidth');
        }
    };

    function handleLastName(event: React.FormEvent<HTMLInputElement>) {
        if (!/^[a-zA-Z\s]+$/.test(event.currentTarget.value)) { setlastnameclassName('redBorder'); }
        else {
            changeState(event.currentTarget.value, 'lastName');
            setlastnameclassName('inputEqualWidth');
        }
    };

    function handleAge(event: React.FormEvent<HTMLInputElement>) {
        if (!/^\d+$/.test(event.currentTarget.value)) { setageclassName('redBorder'); }
        else {
            changeState(event.currentTarget.value, 'age');
            setageclassName('inputEqualWidth');
        }
    };
    function handleEmail(event: React.FormEvent<HTMLInputElement>) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.currentTarget.value)) { setemailclassName('redBorder'); }
        else {
            changeState(event.currentTarget.value, 'email');
            setemailclassName('inputEqualWidth');
        }
    };
    function handlephoneNumber(event: React.FormEvent<HTMLInputElement>) {
        if (!/^\d+$/.test(event.currentTarget.value)) { setphoneNumberclassName('redBorder'); }
        else {
            changeState(event.currentTarget.value, 'phoneNumber');
            setphoneNumberclassName('inputEqualWidth');
        }
    };

    return (
        <div className="form">
            <h2> Add a new user:</h2>
            <form onSubmit={submitData} onChange={() => { setdisabledBtn(false) }} ref={form}>

                <div className="form-items"> <label htmlFor="name"> First Name </label>
                    <input id="name" className={firstnameclassName} type="text" onChange={handleFirstName} placeholder='First Name' />
                </div>
                <div className="form-items"> <label htmlFor="surname"> Last Name</label>
                    <input id="surname" className={lastnameclassName} type="text" onChange={handleLastName} placeholder='Last Name' />
                </div>
                <div className="form-items"> <label htmlFor="email"> Email</label>
                    <input id="email" type="email" className={emailclassName} onChange={handleEmail} placeholder='Email' />
                </div>
                <div className="form-items">  <label htmlFor="age"> Age</label>
                    <input id="age" type="text" className={ageclassName} onChange={handleAge} placeholder='Age' />
                </div>
                <div className="form-items">  <label htmlFor="phone"> Phone number</label>
                    <input id="phone" type="tel" className={phoneNumberclassName} onChange={handlephoneNumber} placeholder='0991112233' pattern="[0-9]{10}" />
                </div>
                <div className="form-items">
                    <button className="btnSubmit" type="submit" disabled={disabledBtn} >Submit</button>
                </div>

            </form >
        </div>
    )
}