import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginUser } from '../../services/credentials/login';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const defaultTheme = createTheme();

export default function SignIn({setIsLoggedIn , isLoggedIn}) {
  const [username , setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [invalidPassword, setInvalidPassword] = React.useState(false);
  const [invalidUsername , setInvalidUsername] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigator = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(()=>{
    if(isLoggedIn){
      navigator('/');
    }
  } , [])


  const validate_user = async()=>{
    try{
      const response = await loginUser({id:username , password:password}) ;
      sessionStorage.setItem('role' , response.role); //Save user role in session storage
      sessionStorage.setItem('username' , username); //Save user username in session storage
      if(response.code === 1){
        Cookies.set('token', response.token , { expires: 3 })
        setIsLoggedIn(true);
        navigator('/');
      }
    }
    catch(err){
      console.log(err);
    }
  }


  const handleSubmit = async(event) => {
    event.preventDefault();
    if(username==='' || password==='') {
      if(username==='' && password==='') {
        setInvalidPassword(true);
        setInvalidUsername(true);
      }
      else if(username===''){
        setInvalidUsername(true);
        setInvalidPassword(false);
      }
      else{
        setInvalidPassword(true);
        setInvalidUsername(false);
      }
      return;
    }
    setInvalidPassword(false);
    setInvalidUsername(false);
    await validate_user();
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              error={invalidUsername}
              helperText={invalidUsername?'Invalid username':''}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
              error={invalidPassword}
              helperText={invalidPassword?'Invalid password':''}
              margin="normal"
              name="password"
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              InputProps={
                {
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}