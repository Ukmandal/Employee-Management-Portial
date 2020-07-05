using KtmGymCenter.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace KtmGymCenter.Controllers
{
    [RoutePrefix("Api/Employee")]
    public class EmployeeController : ApiController
    {
        private EmployeeEntities objEntity = new EmployeeEntities();

        [HttpGet]
        [Route("AllEmployees")]
        public IQueryable<Employee> GetEmployee()
        {
            try
            {
                return objEntity.Employees;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("Department")]
        public IQueryable<Department> GetDepartment()
        {
            try
            {
                return objEntity.Departments;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetEmployeesById/{employeeId}")]
        public IHttpActionResult GetEmployeeById(string employeeId)
        {
            Employee objEmp = new Employee();
            int ID = Convert.ToInt32(employeeId);
            try
            {
                objEmp = objEntity.Employees.Find(ID);
                if (objEmp == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objEmp);
        }

        [HttpPost]
        [Route("InsertEmployees")]
        public IHttpActionResult PostEmployee(Employee data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objEntity.Employees.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpPut]
        [Route("UpdateEmployees")]
        public IHttpActionResult PutEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Employee objEmp = new Employee();
                objEmp = objEntity.Employees.Find(employee.EmployeeID);
                if (objEmp != null)
                {
                    objEmp.EmployeeName = employee.EmployeeName;
                    objEmp.Department = employee.Department;
                    objEmp.MailID = employee.MailID;
                    objEmp.DOJ = employee.DOJ;
                    objEmp.Address = employee.Address;
                    objEmp.Phone = employee.Phone;
                    objEmp.Salary = employee.Salary;
                    objEmp.Age = employee.Age;

                }
                int i = this.objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(employee);
        }

        [HttpDelete]
        [Route("DeleteEmployees")]
        public IHttpActionResult DeleteEmployee(int id)
        {
            //int empId = Convert.ToInt32(id);  
            Employee employee = objEntity.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            objEntity.Employees.Remove(employee);
            objEntity.SaveChanges();

            return Ok(employee);
        }
    }
}
