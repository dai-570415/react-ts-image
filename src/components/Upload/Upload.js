import { useState } from 'react';
import firebase, { storage, db } from '../../Firebase';
import { useForm } from 'react-hook-form';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import Style from './Upload.module.scss';

const Upload = () => {
    // Create
    const [msg, setMsg] = useState('');
    const [pending,setPending] = useState(false);
    // Upload
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const { register, handleSubmit, errors } = useForm();

    // auth user
    const user = firebase.auth().currentUser;
    let authId;
    let email;
    let name;
    let photoURL;
    if (user != null) {
        user.providerData.forEach(() => {
            authId = user.uid;
            email = user.email;
            name = user.displayName;
            photoURL = user.photoURL;
        });
    }

    // Create
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const OnSubmit = async () => {
        setMsg('');
        setImageUrl('');
        setPending(true);
        try {
            await firebase
                .firestore()
                .collection('posts')
                .add({
                    msg,
                    createdAt,
                    imageUrl,
                    // 以下firebase.auth().currentUser情報
                    authId,
                    email,
                    name,
                    photoURL
                });
        } finally {
            setPending(false);
        }
    }
    
    // Render
    const [ list, loading, error ] = useCollectionData(db.collection('posts').orderBy('createdAt', 'desc'), { idField: 'docId' });
    console.log(list);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    const result = Object.keys(list).length; // Countを数える
    console.log(result);

    // Delete
    const handleDelete = (uid) => {
        if (window.confirm('削除しますか？')) {
            db.collection('posts').doc(uid).delete();
        }
    }

    // File upload
    const handleImage = e => {
        const image = e.target.files[0];
        setImage(image);
    }
    const onSubmit = e => {
        e.preventDefault();
        if (image === '') {
            console.log('ファイルが選択されていません');            
        }
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            next,
            uploadError,
            complete
        );
    }
    const next = snapshot => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(percent + '% done');
        console.log(snapshot);
    }
    const uploadError = error => {
        console.log(error);
    }
    const complete = () => {
        storage
        .ref('images')
        .child(image.name)
        .getDownloadURL()
        .then(fireBaseUrl => {
            setImageUrl(fireBaseUrl);
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <textarea
                    value={ msg }
                    onChange={ e => setMsg(e.target.value) }
                    placeholder="コメント"
                    name="msg"
                    ref={register({ required: true })}
                >
                </textarea>
                {imageUrl && (
                    <>
                        <input
                            type="hidden"
                            value={imageUrl}
                            onChange={ e => setImageUrl(e.target.value) }
                            name="image"
                            ref={register({ required: false })}
                        />
                    </>
                )}
                <div>{errors.msg && 'コメントが入力されていません'}</div>
                <button type="submit">投稿</button>
                { pending && 'Pendeing...' }  
            </form>

            <form onSubmit={onSubmit}>
                <input type="file" onChange={handleImage} />
                <button>Upload</button>
            </form>
            {imageUrl && (
                <>
                    <img src={imageUrl} id="imgSample" alt="uploaded" />
                </>
            )}
            
            {list.map(item => (
                <div key={item.docId + String(new Date())}>
                    {authId === item.authId ? (
                        <>
                            {item.name ? (
                                <div>{item.name}</div>
                            ) : (
                                <div>ゲストユーザー</div>
                            )}
                            <div>
                                <div>{item.msg}</div>
                                <div className="delete"  onClick={() => handleDelete(item.docId)}>Delete</div>
                            </div>
                            {item.imageUrl && (
                                <img src={item.imageUrl} alt="イメージ画像" />
                            )}
                            {item.photoURL ? (
                                <img src={ item.photoURL } alt="ユーザー画像" />
                            ) : (
                                <div>no image</div>
                            )}
                        </>
                    ) : (
                        <>
                            <div>
                                {item.name ? (
                                    <div>{item.name}</div>
                                ) : (
                                    <div>ゲストユーザー</div>
                                )}
                                <div>
                                    <div>{item.msg}</div>
                                </div>
                                {item.imageUrl && (
                                    <img src={item.imageUrl} alt="イメージ画像" />
                                )}
                                {item.photoURL ? (
                                    <img src={ item.photoURL } alt="ユーザー画像" />
                                ) : (
                                    <div>no image</div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export default Upload;