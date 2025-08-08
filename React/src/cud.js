import React, { useState, useEffect } from 'react';

const ResetDB=async ()=>{
    try {
        const response = await fetch('http://localhost:9015/api/Refresh', {
        method: 'POST'
    });
    
    if (response.ok) {
      console.log('Refresh successful');
      // Refresh your data here
    }
  } catch (error) {
    console.error('Refresh failed:', error);
  }
}
const DeleteProduct=async (id)=>{
    try {
        const response = await fetch('http://localhost:9015/Products/Delete', {
        method: 'POST',
        body: JSON.stringify({
        productID: id
        })
        }
    )
    if (response.ok) {
      console.log('Delete successful');
      // Refresh your data here
    }
  } catch (error) {
    console.error(`Delete failed ${id}:`, error);
  }
}
export {ResetDB,DeleteProduct};