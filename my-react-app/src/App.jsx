import './App.css';
import ShoppingCart from './Components/ShoppingCart.jsx';
import { 
  UserCard, 
  TodoList, 
  ListOrSingle, 
  AtLeastOne, 
  Product, 
  AdvancedProduct 
} from './Components/Props.jsx';

function App() {
  return (
    <div className="App">
      {/* Кошик покупок */}
      <ShoppingCart />
      
      <hr style={{ margin: '40px 0', border: '2px solid #333' }} />
      
      {/* Демонстрація PropTypes */}
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Демонстрація PropTypes</h1>
        
        <h2>✅ Правильні приклади:</h2>
        <UserCard user={{ name: "Іван", age: 25, email: "ivan@example.com" }} />
        <TodoList todos={["Купити хліб", "Помити посуд"]} />
        <ListOrSingle data={["один", "два"]} />
        <ListOrSingle data={{ value: "значення" }} />
        <AtLeastOne items={["item1"]} />
        <Product product={{ title: "Молоко", price: 50 }} />
        <AdvancedProduct product={{ title: "Яблуко", price: 25, category: "food" }} />
        
        <h2>⚠️ Приклади з помилками (перевірте консоль):</h2>
        
        {/* Розкоментуйте по одному для перевірки помилок */}
        {false && <UserCard user={{ name: "Іван", age: "25", email: "ivan@example.com" }} />}
        {false && <TodoList todos={[123, "Помити посуд"]} />}
        {false && <AtLeastOne items={[]} />}
        {false && <Product product={{ title: "Молоко", price: -10 }} />}
        {false && <AdvancedProduct product={{ title: "", price: 50, category: "books" }} />}
        
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <p><strong>Примітка:</strong> Для перевірки помилок розкоментуйте рядки з помилковими даними (замініть `false` на `true`)</p>
        </div>
      </div>
    </div>
  );
}

export default App;