import React, { FormEvent, useState } from 'react'
import { IonContent, IonPage } from "@ionic/react";
import Header from '../component/header'
import { TextInput } from '../component/input'
import { SubmitButton } from '../component/button'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../module/actions/authActions"
import { Loading } from '../component/loading';
import { useHistory } from "react-router";

export default function Signup() {

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [password, setPassword] = useState<string>();

    const dispatch = useDispatch();
    const history = useHistory();

    let isLoading: boolean = useSelector((state: any) => state.auth.isLoading)
    let isAuthenticated: boolean = useSelector((state: any) => state.auth.isAuthenticated)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(registerUser({ name, email, phone, password }))
    }

    if(isAuthenticated){
        history.replace({
            pathname:  "/"
        })
    }


    if(isLoading){
        return <Loading />
    }

    return (
        <IonPage>
            <Header title="Bankloan signup" />
            <IonContent>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextInput label="Name" text={name} ionChange={(value: string) => setName(value)} required/>
                    <TextInput label="Email" text={email} ionChange={(value: string) => setEmail(value)} required type="email" />
                    <TextInput label="Phone" text={phone} ionChange={(value: string) => setPhone(value)} required type="number" />
                    <TextInput label="Password" text={password} ionChange={(value: string) => setPassword(value)} required type="password" />
                    <SubmitButton label="Submit" type="submit" />
                </form>
            </IonContent>
        </IonPage>
    )
}
