import {Layout, Menu, Breadcrumb  } from 'antd';
import React, {useState} from 'react'
import {Link, Route} from 'react-router-dom'
import styles from './sidebar.module.scss'
import 'antd/dist/antd.css';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import InvenTable from '../Inventory/index'
import InventoryLog from '../Inventory/inventoryLog'
import InventoryList from "../Inventory/inventoryList";
import DistributeInfo from '../Distribute/distributeInfo'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [state, setState] = useState({collapsed: false})

  const toggleCollapsed = () => {
    setState(state =>({collapsed:!state.collapsed}));
  };
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={state.collapsed} onCollapse={toggleCollapsed}>
          <div className={styles.logo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
             <SubMenu key="sub1" icon={<FileOutlined />} title="庫存管理">
               <Menu.Item key="1" icon={<PieChartOutlined />}>
               <Link to='/inventoryTable'>
                 庫存倉庫
               </Link>
               </Menu.Item>
               <Menu.Item key="2" icon={<DesktopOutlined />}>
                 <Link to="/inventoryLog"></Link>
               庫存清單
               </Menu.Item>
               <Menu.Item key="3" icon={<TeamOutlined />}>
                 <Link to="/inventoryList"></Link>
               庫存異動紀錄
               </Menu.Item>
             </SubMenu>
            <SubMenu key="sub2" icon={<DesktopOutlined />} title="出貨管理">
              <Menu.Item key="4">
                <Link to="/distributeInfo"></Link>
                出貨資料
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<DesktopOutlined />} title="客戶管理">
              <Menu.Item key="5">客戶類別</Menu.Item>
              <Menu.Item key="6">客戶資料</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<DesktopOutlined />} title="商品管理">
              <Menu.Item key="7">商品資料</Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<DesktopOutlined />} title="物料管理">
              <Menu.Item key="8">物料倉庫類別</Menu.Item>
              <Menu.Item key="9">物料清單</Menu.Item>
              <Menu.Item key="10">物料異動紀錄</Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<DesktopOutlined />} title="標籤管理">
              <Menu.Item key="11">標籤資料</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Route path='/inventoryTable' exact component={ InvenTable } />
            <Route path='/inventoryLog' exact component={ InventoryLog } />
            <Route path='/inventoryList' exact component={ InventoryList } />
            <Route path='/distributeInfo' exact component={ DistributeInfo } />
          </Content>
        </Layout>
      </Layout>
    );
}
export default Sidebar
