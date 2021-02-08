import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AuthContext } from './AuthProvider';
import Style from './Sign.module.scss';

const Signup = ({ history }) => {
    const { signup } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        signup(email.value, password.value, history);
    }

    return (
        <>
            <div className={ Style.sign }>
                <h2>サインアップ</h2>
                <form onSubmit={ handleSubmit }>
                    <input name="email" type="email" placeholder="メールアドレス" />
                    <input name="password" type="password" placeholder="パスワード" />
                    <button type="submit">サインアップ</button>
                </form>
                <Link to="/">登録ユーザーですか？ログイン</Link>
            </div>
        </>
    );
}

export default withRouter(Signup);