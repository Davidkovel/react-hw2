import React from 'react';
import PropTypes from 'prop-types';

// Завдання 1: UserCard
export const UserCard = ({ user }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{user.name}</h3>
      <p>Вік: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
};

// Завдання 2: TodoList
export const TodoList = ({ todos }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Список справ:</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.string).isRequired
};

// Завдання 3: ListOrSingle
export const ListOrSingle = ({ data }) => {
  if (Array.isArray(data)) {
    return (
      <div>
        <h3>Масив:</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  return (
    <div>
      <h3>Об'єкт:</h3>
      <p>Значення: {data.value}</p>
    </div>
  );
};

ListOrSingle.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.shape({
      value: PropTypes.string.isRequired
    })
  ]).isRequired
};

// Завдання 4: AtLeastOne
export const AtLeastOne = ({ items }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Елементи ({items.length}):</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

AtLeastOne.propTypes = {
  items: function(props, propName, componentName) {
    const items = props[propName];
    
    if (!Array.isArray(items)) {
      return new Error(
        `Проп ${propName} у компоненті ${componentName} має бути масивом`
      );
    }
    
    if (items.length === 0) {
      return new Error(
        `Проп ${propName} у компоненті ${componentName} не може бути порожнім масивом`
      );
    }
  }.isRequired
};

// Завдання 5: Product
export const Product = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{product.title}</h3>
      <p>Ціна: {product.price} грн</p>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: function(props, propName, componentName) {
      const price = props[propName];
      
      if (typeof price !== 'number') {
        return new Error(
          `Проп ${propName} у компоненті ${componentName} має бути числом`
        );
      }
      
      if (price <= 0) {
        return new Error(
          `Проп ${propName} у компоненті ${componentName} має бути більше 0`
        );
      }
    }.isRequired
  }).isRequired
};

// Додаткове завдання: AdvancedProduct
export const AdvancedProduct = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{product.title}</h3>
      <p>Ціна: {product.price} грн</p>
      <p>Категорія: {product.category}</p>
    </div>
  );
};

AdvancedProduct.propTypes = {
  product: function(props, propName, componentName) {
    const product = props[propName];
    
    if (!product || typeof product !== 'object') {
      return new Error(`Проп ${propName} має бути об'єктом`);
    }
    
    if (!product.title || typeof product.title !== 'string' || product.title.trim() === '') {
      return new Error(`Проп ${propName}.title має бути непорожнім рядком`);
    }
    
    if (typeof product.price !== 'number' || product.price <= 0) {
      return new Error(`Проп ${propName}.price має бути додатнім числом`);
    }
    
    const validCategories = ['food', 'clothes', 'electronics'];
    if (!validCategories.includes(product.category)) {
      return new Error(
        `Проп ${propName}.category має бути одним з: ${validCategories.join(', ')}`
      );
    }
  }.isRequired
};