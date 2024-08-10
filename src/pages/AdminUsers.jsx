import React from 'react'
import { useAdminContext } from '../Context/AdminContext';
const AdminUsers = () => {
  const { allUsers, Make_Remove_Admin, DeleteUser } = useAdminContext();


  return (


    <section className='section-admin-users mt-10'>
      <div className="container">
        <div className="heading">
          <h2 className='feature-Heading common-heading'>Users</h2>
        </div>

        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                allUsers.map((curr, index) => {
                  return (

                    <tr>
                      <td>{curr.name}</td>
                      <td>{curr.email}</td>
                      <td>
                        <button
                          onClick={() => Make_Remove_Admin(curr, index)}
                          className={`${curr.isAdmin ? "edit-button" : "delete-button"}`}>
                          {curr.isAdmin ? "Yes" : "No"}
                        </button>
                      </td>
                      <td><button
                        onClick={() => DeleteUser(curr, index)}
                        className="delete-button">
                        Delete
                      </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </section >
  )
}

export default AdminUsers
