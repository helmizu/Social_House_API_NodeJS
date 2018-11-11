# Documentation API PW

1. Register <br>
method : post <br>
url : http://localhost:3000/users/register<br>
data : <br>
```
{
         "email" : "email@email.com",
         "name":"nama lengkap",
         "gender":"laki-laki",
         "date":"22 januari 2001",
         "username":"helmi.zu",
         "confirm":"password",
         "password" : "password"
}
```

2. Login<br>
method : post<br>
url : http://localhost:3000/users/login<br>
data : <br>
```
{
         "email" : "email@email.com", //bisa username, tapi keynya ttep email
         "password" : "password"
}
```

3. Posting<br>
method : post <br>
url : http://localhost:3000/thread/posting <br>
header : <br> 
```
{
         Authorization : Bearer x.x.x.x
}
```
data :<br> 
```
{
         "post" : "isi postingan"
}
```

4. Comment<br>
method : post<br>
url : http://localhost:3000/thread/comment/:tid<br>
example : http://localhost:3000/thread/comment/5be8371780a9873d149e1b40 <br>
header : <br>
```
{
         Authorization : Bearer x.x.x.x
}
```
data :<br> 
```
{
         "comment" : "isi comment"
}
```

5. Like <br>
method : post<br>
url : http://localhost:3000/thread/like/:tid<br>
example : http://localhost:3000/thread/like/5be8371780a9873d149e1b40<br>
header : <br>
```
{
         Authorization : Bearer x.x.x.x
}
```