import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, Bell, LogOut, Plus, Edit, Trash2, Check, Clock, DollarSign, Truck, FileText, Star, X } from 'lucide-react';

// Mock Data Storage
const mockUsers = [
  { id: 1, username: 'owner', password: 'owner123', role: 'owner', name: 'System Owner' },
  { id: 2, username: 'kantin1', password: 'kantin123', role: 'canting', name: 'Kantin Sejahtera', status: 'active' },
  { id: 3, username: 'user1', password: 'user123', role: 'client', name: 'Ahmad Rizki', department: 'IT' },
];

const mockMenus = [
  { id: 1, cantingId: 2, name: 'Nasi Goreng', price: 15000, category: 'Main', available: true, image: '🍛' },
  { id: 2, cantingId: 2, name: 'Mie Goreng', price: 12000, category: 'Main', available: true, image: '🍜' },
  { id: 3, cantingId: 2, name: 'Ayam Bakar', price: 20000, category: 'Main', available: true, image: '🍗' },
  { id: 4, cantingId: 2, name: 'Es Teh', price: 3000, category: 'Drink', available: true, image: '🥤' },
  { id: 5, cantingId: 2, name: 'Jus Jeruk', price: 8000, category: 'Drink', available: true, image: '🧃' },
];

const CateringManagementSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(mockUsers);
  const [menus, setMenus] = useState(mockMenus);
  const [groups, setGroups] = useState([]);
  const [orders, setOrders] = useState([]);
  const [specialOrders, setSpecialOrders] = useState([]);
  const [cantings, setCantings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const sendTelegramNotification = (message) => {
    console.log('Telegram Notification:', message);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      read: false
    }]);
  };

  useEffect(() => {
    const healthCheck = setInterval(() => {
      const isHealthy = Math.random() > 0.05;
      if (!isHealthy) {
        sendTelegramNotification('⚠️ ALERT: System breakdown detected!');
      }
    }, 120000);

    return () => clearInterval(healthCheck);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
      sendTelegramNotification(`✅ ${user.name} logged in successfully`);
    } else {
      alert('Username atau password salah!');
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      sendTelegramNotification(`👋 ${currentUser.name} logged out`);
    }
    setCurrentUser(null);
    setShowLogin(true);
    setActiveTab('dashboard');
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className="text-3xl font-bold text-gray-800">Catering SaaS</h1>
            <p className="text-gray-600 mt-2">Management System</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <p className="font-semibold">Demo Accounts:</p>
            <p>Owner: owner / owner123</p>
            <p>Kantin: kantin1 / kantin123</p>
            <p>Client: user1 / user123</p>
          </div>
        </div>
      </div>
    );
  }

  const OwnerDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Owner Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <Users className="w-8 h-8 mb-2" />
          <div className="text-3xl font-bold">{users.length}</div>
          <div className="text-blue-100">Total Users</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <Package className="w-8 h-8 mb-2" />
          <div className="text-3xl font-bold">{cantings.length + 1}</div>
          <div className="text-green-100">Active Cantings</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <ShoppingCart className="w-8 h-8 mb-2" />
          <div className="text-3xl font-bold">{orders.length}</div>
          <div className="text-purple-100">Total Orders</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <DollarSign className="w-8 h-8 mb-2" />
          <div className="text-3xl font-bold">Rp {(orders.reduce((sum, o) => sum + (o.total || 0), 0)).toLocaleString()}</div>
          <div className="text-orange-100">Revenue</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">System Monitoring</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>System Status</span>
            </div>
            <span className="text-green-600 font-semibold">Healthy</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="text-blue-600" />
              <span>Telegram Integration</span>
            </div>
            <span className="text-blue-600 font-semibold">Active</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Notifications</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {notifications.slice(-5).reverse().map(notif => (
            <div key={notif.id} className="p-3 bg-gray-50 rounded-lg text-sm">
              <div className="font-medium">{notif.message}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(notif.timestamp).toLocaleString('id-ID')}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center text-gray-500 py-4">No notifications yet</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">User Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${user.role === 'owner' ? 'bg-purple-100 text-purple-700' : 
                        user.role === 'canting' ? 'bg-green-100 text-green-700' : 
                        'bg-blue-100 text-blue-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CantingDashboard = () => {
    const [cantingStatus, setCantingStatus] = useState('open');
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Kantin Management</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCantingStatus(cantingStatus === 'open' ? 'closed' : 'open')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                cantingStatus === 'open' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Status: {cantingStatus === 'open' ? 'OPEN' : 'CLOSED'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <ShoppingCart className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{orders.filter(o => o.status === 'pending').length}</div>
            <div className="text-green-100">Pending Orders</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <Clock className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{orders.filter(o => o.status === 'preparing').length}</div>
            <div className="text-blue-100">Preparing</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <Truck className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{orders.filter(o => o.status === 'delivered').length}</div>
            <div className="text-purple-100">Delivered</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Menu Management</h3>
            <button 
              onClick={() => {
                setModalType('addMenu');
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Menu
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menus.map(menu => (
              <div key={menu.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="text-4xl text-center mb-2">{menu.image}</div>
                <h4 className="font-bold text-lg">{menu.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{menu.category}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-blue-600">Rp {menu.price.toLocaleString()}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    menu.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {menu.available ? 'Available' : 'Sold Out'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded hover:bg-blue-100">
                    <Edit className="w-4 h-4 mx-auto" />
                  </button>
                  <button 
                    onClick={() => {
                      setMenus(menus.map(m => 
                        m.id === menu.id ? {...m, available: !m.available} : m
                      ));
                    }}
                    className="flex-1 bg-yellow-50 text-yellow-600 py-2 rounded hover:bg-yellow-100 text-xs font-semibold"
                  >
                    Toggle
                  </button>
                  <button className="flex-1 bg-red-50 text-red-600 py-2 rounded hover:bg-red-100">
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Special Order Services</h3>
          <div className="space-y-3">
            {specialOrders.filter(so => so.cantingId === currentUser.id).map(so => (
              <div key={so.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold">{so.title}</h4>
                    <p className="text-sm text-gray-600">{so.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    so.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    so.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {so.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  Requested by: {users.find(u => u.id === so.clientId)?.name}
                </div>
                {so.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setSpecialOrders(specialOrders.map(s => 
                          s.id === so.id ? {...s, status: 'accepted'} : s
                        ));
                        sendTelegramNotification(`✅ Special order "${so.title}" accepted by ${currentUser.name}`);
                      }}
                      className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button 
                      onClick={() => {
                        setSpecialOrders(specialOrders.map(s => 
                          s.id === so.id ? {...s, status: 'rejected'} : s
                        ));
                      }}
                      className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
            {specialOrders.filter(so => so.cantingId === currentUser.id).length === 0 && (
              <div className="text-center text-gray-500 py-8">No special orders yet</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Invoice Management</h3>
          <div className="space-y-3">
            {orders.filter(o => o.status === 'delivered').map(order => (
              <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold">Invoice #{order.id}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-blue-600">
                      Rp {order.total?.toLocaleString()}
                    </div>
                    <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {orders.filter(o => o.status === 'delivered').length === 0 && (
              <div className="text-center text-gray-500 py-8">No invoices yet</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ClientDashboard = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Client Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <Users className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{groups.filter(g => g.createdBy === currentUser.id).length}</div>
            <div className="text-blue-100">My Groups</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <ShoppingCart className="w-8 h-8 mb-2" />
            <div className="text-3xl font-bold">{orders.filter(o => o.clientId === currentUser.id).length}</div>
            <div className="text-green-100">My Orders</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">My Groups</h3>
            <button 
              onClick={() => {
                setModalType('createGroup');
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Group
            </button>
          </div>
          
          <div className="space-y-3">
            {groups.filter(g => g.createdBy === currentUser.id).map(group => (
              <div key={group.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                  <div>
                    <h4 className="font-bold text-lg">{group.name}</h4>
                    <p className="text-sm text-gray-600">Department: {group.department}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedItem(group);
                      setModalType('orderForGroup');
                      setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
                  >
                    Order for Group
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-semibold mb-2">Members ({group.members?.length || 0}):</div>
                  <div className="flex flex-wrap gap-2">
                    {group.members?.map((member, idx) => (
                      <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm border">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {groups.filter(g => g.createdBy === currentUser.id).length === 0 && (
              <div className="text-center text-gray-500 py-8">No groups yet. Create your first group!</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Special Order Service</h3>
            <button 
              onClick={() => {
                setModalType('specialOrder');
                setShowModal(true);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Request Special</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {specialOrders.filter(so => so.clientId === currentUser.id).map(so => (
              <div key={so.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold">{so.title}</h4>
                    <p className="text-sm text-gray-600">{so.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    so.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    so.status === 'accepted' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {so.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(so.createdAt).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
            {specialOrders.filter(so => so.clientId === currentUser.id).length === 0 && (
              <div className="text-center text-gray-500 py-8">No special orders yet</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Order History</h3>
          <div className="space-y-3">
            {orders.filter(o => o.clientId === currentUser.id).map(order => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold">Order #{order.id}</div>
                    <div className="text-sm text-gray-600">{order.groupName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">Rp {order.total?.toLocaleString()}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString('id-ID')}
                </div>
              </div>
            ))}
            {orders.filter(o => o.clientId === currentUser.id).length === 0 && (
              <div className="text-center text-gray-500 py-8">No orders yet</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const GroupModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      department: '',
      members: ['']
    });

    const addMember = () => {
      setFormData({...formData, members: [...formData.members, '']});
    };

    const updateMember = (index, value) => {
      const newMembers = [...formData.members];
      newMembers[index] = value;
      setFormData({...formData, members: newMembers});
    };

    const removeMember = (index) => {
      const newMembers = formData.members.filter((_, i) => i !== index);
      setFormData({...formData, members: newMembers});
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newGroup = {
        id: Date.now(),
        ...formData,
        createdBy: currentUser.id,
        createdAt: new Date().toISOString()
      };
      setGroups([...groups, newGroup]);
      sendTelegramNotification(`📋 New group "${formData.name}" created by ${currentUser.name}`);
      setShowModal(false);
      setFormData({ name: '', department: '', members: [''] });
    };

    return (
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Create New Group</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Group Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Dept IT Team"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., IT Department"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Group Members</label>
              <button
                type="button"
                onClick={addMember}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>
            </div>
            <div className="space-y-2">
              {formData.members.map((member, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={`Member ${index + 1} name`}
                    required
                  />
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    );
  };

  const OrderModal = () => {
    const [memberOrders, setMemberOrders] = useState(
      selectedItem?.members?.map(member => ({
        member,
        items: []
      })) || []
    );

    const addItemToMember = (memberIndex, menuItem) => {
      const newMemberOrders = [...memberOrders];
      const existingItem = newMemberOrders[memberIndex].items.find(i => i.id === menuItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newMemberOrders[memberIndex].items.push({...menuItem, quantity: 1});
      }
      
      setMemberOrders(newMemberOrders);
    };

    const updateQuantity = (memberIndex, itemId, delta) => {
      const newMemberOrders = [...memberOrders];
      const item = newMemberOrders[memberIndex].items.find(i => i.id === itemId);
      
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          newMemberOrders[memberIndex].items = newMemberOrders[memberIndex].items.filter(i => i.id !== itemId);
        }
      }
      
      setMemberOrders(newMemberOrders);
    };

    const calculateTotal = () => {
      return memberOrders.reduce((total, mo) => 
        total + mo.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      , 0);
    };

    const handleSubmit = () => {
      const newOrder = {
        id: Date.now(),
        clientId: currentUser.id,
        groupId: selectedItem.id,
        groupName: selectedItem.name,
        memberOrders: memberOrders,
        total: calculateTotal(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      setOrders([...orders, newOrder]);
      sendTelegramNotification(`🛒 New order from ${currentUser.name} for group "${selectedItem.name}" - Total: Rp ${calculateTotal().toLocaleString()}`);
      setShowModal(false);
      setSelectedItem(null);
    };

    return (
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Order for {selectedItem?.name}</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-3">Available Menu</h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {menus.filter(m => m.available).map(menu => (
                <div key={menu.id} className="border rounded-lg p-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{menu.image}</span>
                    <div>
                      <div className="font-semibold">{menu.name}</div>
                      <div className="text-sm text-gray-600">Rp {menu.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3">Member Orders</h4>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {memberOrders.map((mo, memberIndex) => (
                <div key={memberIndex} className="border rounded-lg p-4 bg-gray-50">
                  <div className="font-semibold mb-3">{mo.member}</div>
                  
                  <div className="mb-3">
                    <select
                      onChange={(e) => {
                        const menu = menus.find(m => m.id === parseInt(e.target.value));
                        if (menu) addItemToMember(memberIndex, menu);
                        e.target.value = "";
                      }}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    >
                      <option value="">+ Add menu item</option>
                      {menus.filter(m => m.available).map(menu => (
                        <option key={menu.id} value={menu.id}>
                          {menu.name} - Rp {menu.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {mo.items.length > 0 ? (
                    <div className="space-y-2">
                      {mo.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-gray-600">Rp {item.price.toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(memberIndex, item.id, -1)}
                              className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(memberIndex, item.id, 1)}
                              className="w-6 h-6 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="text-right font-bold text-blue-600 pt-2 border-t">
                        Subtotal: Rp {mo.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 text-center py-2">No items yet</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Order:</span>
                <span className="font-bold text-2xl text-blue-600">Rp {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t">
          <button
            onClick={() => {
              setShowModal(false);
              setSelectedItem(null);
            }}
            className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={calculateTotal() === 0}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Place Order
          </button>
        </div>
      </div>
    );
  };

  const SpecialOrderModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      budget: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newSpecialOrder = {
        id: Date.now(),
        ...formData,
        clientId: currentUser.id,
        cantingId: 2,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      setSpecialOrders([...specialOrders, newSpecialOrder]);
      sendTelegramNotification(`⭐ New special order request from ${currentUser.name}: "${formData.title}"`);
      setShowModal(false);
      setFormData({ title: '', description: '', budget: '' });
    };

    return (
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
        <h3 className="text-2xl font-bold mb-4">Special Order Request</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Service Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Catering for Meeting"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              rows="4"
              placeholder="Describe your special order requirements..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Budget (Optional)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter budget amount"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    );
  };

  const AddMenuModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      category: 'Main',
      image: '🍽️'
    });

    const emojis = ['🍛', '🍜', '🍗', '🍕', '🍔', '🌮', '🥗', '🍱', '🥤', '☕', '🧃', '🍰'];

    const handleSubmit = (e) => {
      e.preventDefault();
      const newMenu = {
        id: Date.now(),
        cantingId: currentUser.id,
        ...formData,
        price: parseInt(formData.price),
        available: true
      };
      
      setMenus([...menus, newMenu]);
      sendTelegramNotification(`🍽️ New menu added by ${currentUser.name}: ${formData.name}`);
      setShowModal(false);
      setFormData({ name: '', price: '', category: 'Main', image: '🍽️' });
    };

    return (
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
        <h3 className="text-2xl font-bold mb-4">Add New Menu</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Menu Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Nasi Goreng Special"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price (Rp)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="15000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Main">Main Course</option>
              <option value="Drink">Drink</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Icon</label>
            <div className="grid grid-cols-6 gap-2">
              {emojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({...formData, image: emoji})}
                  className={`text-3xl p-3 rounded-lg border-2 hover:bg-gray-50 ${
                    formData.image === emoji ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Menu
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍽️</span>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Catering SaaS</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="font-semibold text-gray-800">{currentUser.name}</div>
                <div className="text-xs text-gray-500 capitalize">{currentUser.role}</div>
              </div>
              
              <div className="relative">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="w-5 h-5 text-gray-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentUser.role === 'owner' && <OwnerDashboard />}
        {currentUser.role === 'canting' && <CantingDashboard />}
        {currentUser.role === 'client' && <ClientDashboard />}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 z-10 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
            
            {modalType === 'createGroup' && <GroupModal />}
            {modalType === 'orderForGroup' && <OrderModal />}
            {modalType === 'specialOrder' && <SpecialOrderModal />}
            {modalType === 'addMenu' && <AddMenuModal />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CateringManagementSystem;
