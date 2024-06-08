import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Books from './book/Books';
import Cart from './book/Cart';
import Login from './login/Login';
import About from './About';
import Locals from './local/Locals';
import Favorite from './local/Favorite';
import Join from './login/Join';
import Mypage from './login/Mypage';
import ListPage from './bbs/ListPage';
import InsertPage from './bbs/InsertPage';
import ReadPage from './bbs/ReadPage';
import Updatepage from './bbs/Updatepage';


const Menu = () => {
    const navi = useNavigate();
    const onLogout = (e) =>{
        e.preventDefault();
        sessionStorage.clear();
        navi('/');
    }
    return (
        <>
            <Navbar expand="lg" bg='primary' data-bs-theme='dark'>
                <Container fluid>
                    <Navbar.Brand href="/">HOME</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/books">도서 검색</Nav.Link>
                            <Nav.Link href="/locals">지역 검색</Nav.Link>
                            {sessionStorage.getItem('uid') &&
                                <>
                                <Nav.Link href="/cart">장바구니</Nav.Link>
                                <Nav.Link href="/favorite">즐겨찾기</Nav.Link>
                                </>
                            }
                            <Nav.Link href="/bbs">게시판</Nav.Link>
                        </Nav>
                        {sessionStorage.getItem('email') ?
                            <Nav>
                                <Nav.Link href="/mypage">{sessionStorage.getItem('email')}</Nav.Link>
                                <Nav.Link href="#" onClick={onLogout}>로그아웃</Nav.Link>
                            </Nav>
                            :
                            <Nav>
                                <Nav.Link href="/login">로그인</Nav.Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='/' element={<About />} />
                <Route path='/books' element={<Books />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<Login />} />
                <Route path='/locals' element={<Locals />} />
                <Route path='/favorite' element={<Favorite />} />
                <Route path='/join' element={<Join />} />
                <Route path='/mypage' element={<Mypage />} />
                <Route path='/bbs' element={<ListPage />} />
                <Route path='/bbs/insert' element={<InsertPage />} />
                <Route path='/bbs/read/:id' element={<ReadPage />} />
                <Route path='/bbs/update/:id' element={<Updatepage />} />

            </Routes>
        </>
    );
}

export default Menu
