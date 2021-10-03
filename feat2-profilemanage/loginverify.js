function validate()
{
var username=document.getElementById("somarriba01").value;
var password=document.getElementById("ghost").value;
if(username=="somarriba01"&& password=="ghost")
{
    alert("login succesfully");
    return false;

}
else
{
    alert("login failed");
}


}