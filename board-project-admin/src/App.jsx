import { useContext } from 'react'
import { AuthContext, AuthProvider } from './components/AuthContext'
import DashBoard from './components/DashBoard'
import Login from './components/Login'
import './css/App.css'
import { BrowserRouter } from 'react-router-dom';


// 컴포넌트를 분리하여 하위 컴포넌트에서 useContext 사용
function App() {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  )
}

function AppComponent() {

  const { user } = useContext(AuthContext);
  // 로그인을 했다면 DashBoard 랜더링
  // 로그인을 안했다면 Login 렌더링
  // => 조건 : 로그인 여부
  // => 로그인을 했는지 안했는지 기억해줄 상태 값(user)
  // => user에는 로그인한 사람에 대한 정보가 세팅
  // => user는 AuthContext 안에 작성, ContextAPI를 이용하여 렌더링 조건 처리하겠다!

  return (
    <>
      {user ?
        (
          <div className='body-container'>
            {/* BrowserRouter : React 앱에서 URL 경로에 따라 컴포넌트를 부여줄 수 있게 해주는 라우팅 컨테이너
              (라우팅이 적용될 부분의 최상위 부모 컴포넌트) => Route, Link, NavLink, useNavigate() 등 같은 라우팅 관련 기능 사용 가능 */}
            <BrowserRouter>
              <DashBoard />
            </BrowserRouter>
          </div>
        )
        : (
          <div className='login-section'>
            <Login />
          </div>
        )}
    </>
  )
}

export default App
