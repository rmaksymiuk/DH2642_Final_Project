import './LogIn.css';

export default function LogInView(props){
    
    return (
        <div className="contin">
        <div className="cont">
          <div className="text">{localStorage.getItem('accessToken')
            ?"Login Successful"
            :"Do you want to use our service?"}</div>
          {!localStorage.getItem('accessToken')
            ?<div className="btns">
              <button className="inbt" onClick={props.handleLogin}>Log In</button>
              <button className="inbt" onClick={props.back}>Go to the Main</button>
            </div>
            :null}
          </div>
        </div>
    )
}