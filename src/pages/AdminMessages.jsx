import React from 'react'

import { useAdminContext } from '../Context/AdminContext';

const AdminMessages = () => {
  const { allMessages, DeleteMessage } = useAdminContext();


  return (


    <section className='section-admin-users mt-10'>
      <div className="container">
        <div className="heading">
          <h2 className='feature-Heading common-heading'>Messages</h2>
        </div>

        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                allMessages.map((curr, index) => {
                  return (

                    <tr>
                      <td>{curr.name}</td>
                      <td>{curr.email}</td>
                      <td>{curr.message}</td>
                      <td><button className="delete-button"
                        onClick={() => DeleteMessage(curr, index)}
                      >Delete</button></td>
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

export default AdminMessages
