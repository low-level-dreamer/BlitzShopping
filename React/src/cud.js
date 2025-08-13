import React, { useState, useEffect } from 'react';

const ResetDB=async ()=>{
    try {
        const response = await fetch('http://classwork.engr.oregonstate.edu:9015/api/Refresh', {
        method: 'POST'
    });
    
    if (response.ok) {
      alert('Refresh successful')
      console.log('Refresh successful');
      // Refresh your data here
    }
  } catch (error) {
    alert('Refresh failed:', error)
    console.error('Refresh failed:', error);
  }
}
const DeleteProduct=async (id)=>{
    try {
        const response = await fetch('http://classwork.engr.oregonstate.edu:9015/Products/Delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        productID: id
        })
        }
    )
    if (response.ok) {
      alert('Product deleted successfully!');
      console.log('Delete successful');
    }
  } catch (error) {
    alert('Product deletion failed!');
    console.error(`Delete failed ${id}:`, error);
  }
}
const AddProduct = async (form) => {
  try {
    const response = await fetch('http://classwork.engr.oregonstate.edu:9015/Products/Add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // This is crucial!
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      console.log('Add successful');
      alert('Product added successfully!');
      return true; // Return success status
    } else {
      // Handle non-ok responses
      const errorText = await response.text();
      console.error('Server error:', errorText);
      alert(`Failed to add product: ${errorText}`);
      return false;
    }
  } catch (error) {
    console.error('Add failed:', error); // Fixed: removed undefined 'id'
    alert('Network error. Please check your connection.');
    return false;
  }
};

export {ResetDB,DeleteProduct,AddProduct};