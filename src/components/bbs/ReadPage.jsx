import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { app } from '../../firebaseinit'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'
import { Row, Col, Button, Card  } from 'react-bootstrap'
import Comments from './Comments'

const ReadPage = () => {
    const navi=useNavigate();
    const [post, setPost] = useState('');
    const loginEmail = sessionStorage.getItem('email');
    const {id} = useParams();
    const db=getFirestore(app);
    const callAPI = async() => {
        const res=await getDoc(doc(db, `posts/${id}`));
        //console.log(res);
        setPost(res.data());
    }
    
    const {email, data, title, contents} = post;

    useEffect(()=>{
        callAPI();
    }, []);

    const onClickDelete = async() => {
        if(!window.confirm(`${id}번 게시글을 삭제하겠습니까?`)) return;
        // 게시글 삭제
        await deleteDoc(doc(db,`/posts/${id}`));
        //window.location.href = '/bbs';
        navi('/bbs');
    }

    return (
        <Row className='my-5 justify-content-center'>
            <Col xs={12} md={10} lg={8}>
                <h1 className='mb-5'>게시글 정보</h1>
                {loginEmail==email && 
                    <div className='text-end mb-3'>
                    <Button onClick={()=>navi(`/bbs/update/${id}`)} 
                    variant='success' size="sm" className='me-2'>수정</Button>
                    <Button onClick={onClickDelete} 
                    variant='danger' size="sm">삭제</Button>
                    </div>
                }
                <Card>
                    <Card.Body>
                        <h5>{title}</h5>
                        <div className='text-muted'>
                            <span className='me-2'>{data}</span>
                            <span>{email}</span>
                        </div>
                        <hr/>
                        <div style={{whiteSpace:'pre-wrap'}}>{contents}</div>
                    </Card.Body>
                </Card>
                <Comments/>
            </Col>
        </Row>
    );
}

export default ReadPage