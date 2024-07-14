import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';


const addItems = async () => {
  try {
    const response = await fetch(`https://server-api-jade.vercel.app/admin/read`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    
    const result = await response.json();
    return result.msg;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return {};
  }
};

export default addItems;
