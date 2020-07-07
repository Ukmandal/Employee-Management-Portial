using KtmGymCenter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KtmGymCenter.Controllers
{
    public class LoginController : ApiController
    {
        //For user login   
        [Route("Api/Login/UserLogin")]
        [HttpPost]
        public Response Login(Login Lg)
        {
            EmployeeEntities DB = new EmployeeEntities();
            var Obj = DB.Usp_Login(Lg.UserName, Lg.Password).ToList<Usp_Login_Result>().FirstOrDefault();
            //if (Obj.Status == 0)
            //    return new Response { Status = "Invalid", Message = "Invalid User." };
            //if (Obj.Status == -1)
            //    return new Response { Status = "Inactive", Message = "User Inactive." };
            //else
            return new Response { Status = "Success", Message = Lg.UserName };
        }
        //For new user Registration  
        [Route("Api/Login/UserRegistration")]
        [HttpPost]
        public object createcontact(Registration Lvm)
        {
            try
            {
                EmployeeEntities db = new EmployeeEntities();
                Employeemaster Em = new Employeemaster();
                if (Em.UserId == 0)
                {
                    Em.UserName = Lvm.UserName;
                    Em.LoginName = Lvm.LoginName;
                    Em.Password = Lvm.Password;
                    Em.Email = Lvm.Email;
                    Em.ContactNo = Lvm.ContactNo;
                    Em.Address = Lvm.Address;
                    Em.IsApporved = Lvm.IsApporved;
                    Em.Status = Lvm.Status;
                    db.Employeemasters.Add(Em);
                    db.SaveChanges();
                    return new Response
                    { Status = "Success", Message = "SuccessFully Saved." };
                }
            }
            catch (Exception)
            {
                throw;
            }
            return new Response
            { Status = "Error", Message = "Invalid Data." };
        }
    }
}
