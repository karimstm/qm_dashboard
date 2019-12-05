import React, { Component } from "react";
import { Tabs } from "antd";
import Product from "./Product";
import ModalContent from "../Shared/ModalContent";
import ProductTable from "./Tables/ProductTable";
import {
  FetchProducts,
  FetchCategroy,
  FetchFamily,
  FetchType
} from "../../actions/product";
import { FetchVessels } from '../../actions/vessel';
import { FetchClient } from "../../actions/client";
import { connect } from "react-redux";
import { openNotification } from "../NotificationMessages";
import DropdownList from "./DropdownList";
import CategoryTable from "./Tables/CategoryTable";
import FamilyTable from "./Tables/FamilyTable";
import TypeTable from "./Tables/TypeTable";
import ClientTable from "./Tables/ClientTable";
import OriginTable from "./Tables/OriginTable";
import VesselTable from "./Tables/VesselTable";
import { FetchOrigin } from "../../actions/origin";
import { FetchPorts } from "../../actions/ports";
import PortTable from "./Tables/PortTable";

const { TabPane } = Tabs;

class DataLoading extends Component {
  state = {
    visible: false,
    type: Product,
    title: "Product"
  };

  // Change the modale state from visible to invisible and vice versa
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  // Handle Submit of any form
  // Yet to be implemented
  handleSubmit = values => {
    console.log(values);
  };

  // Fetch Product list from database
  // and send it to product table component <ProductTable />
  fetchProduct = async () => {
    const { FetchProducts } = this.props;
    await FetchProducts();
  };


  // Fetch list of vessels
  fetchVessels = async () => {
    const { FetchVessels } = this.props;
    await FetchVessels();
  }
  // Fetch List of categories
  fetchCategories = async () => {
    const { FetchCategroy } = this.props;
    await FetchCategroy();
  };

  // Fetch List of product families
  fetchFamilies = async () => {
    const { FetchFamily } = this.props;
    await FetchFamily();
  };

  //Fetch list of origins
  fetchOrigins = async () => {
    const { FetchOrigin } = this.props;
    await FetchOrigin();
  }

  // Fetch List of product types
  fetchTypes = async () => {
    const { FetchType } = this.props;
    await FetchType();
  };

  // Fetch Client List
  fetchClients = async () => {
    const { FetchClient } = this.props;
    await FetchClient();
  };

  // Fetch list of ports
  fetchPorts = async () => {
    const { FetchPorts } = this.props;
    await FetchPorts();
  }

  // Fetch data one component is mounted
  componentDidMount() {
    this.fetchProduct();
    this.fetchCategories();
    this.fetchFamilies();
    this.fetchTypes();
    this.fetchClients();
    this.fetchVessels();
    this.fetchOrigins();
    this.fetchPorts();
  }

  action = (type, title) => {
    this.setState({ type, title }, () => this.showModal());
  };

  render() {
    const {
      products,
      clients,
      clientsError,
      error,
      categories,
      categoriesError,
      families,
      familiesError,
      types,
      typesError,
      vessels,
      origins,
      originError,
      ports,
      portsError
    } = this.props;
    if (error) openNotification(error);
    else if (categoriesError) openNotification(categoriesError);
    else if (familiesError) openNotification(familiesError);
    else if (typesError) openNotification(typesError);
    else if (clientsError) openNotification(clientsError);
    else if (originError) openNotification(originError);
    else if (portsError) openNotification(portsError);

    return (
      <div style={{ background: "#fff", padding: "24px" }}>
        <DropdownList action={this.action} />
        <Tabs size="large" defaultActiveKey="1" style={{ clear: "both" }}>
          <TabPane tab="Product" key="1">
            <ProductTable dataSource={products} />
          </TabPane>
          <TabPane tab="Category" key="2">
            <CategoryTable dataSource={categories} />
          </TabPane>
          <TabPane tab="Family" key="3">
            <FamilyTable dataSource={families} />
          </TabPane>
          <TabPane tab="Type" key="4">
            <TypeTable dataSource={types} />
          </TabPane>
          <TabPane tab="Client" key="5">
            <ClientTable dataSource={clients} />
          </TabPane>
          <TabPane tab="Origin" key="6">
            <OriginTable dataSource={origins} />
          </TabPane>
          <TabPane tab="Vessel" key="7">
            <VesselTable dataSource={vessels} />
          </TabPane>
          <TabPane tab="Ports" key="8">
            <PortTable dataSource={ports} />
          </TabPane>
        </Tabs>
        <ModalContent
          title={`Add a ${this.state.title}`}
          onCancel={() => this.setState({ visible: false })}
          component={this.state.type}
          visible={this.state.visible}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.products,
    families: state.families.families,
    categories: state.categories.categories,
    clients: state.clients.clients,
    types: state.types.types,
    error: state.products.error,
    categoriesError: state.categories.error,
    familiesError: state.families.error,
    typesError: state.types.error,
    clientsError: state.clients.error,
    vessels: state.vessels.vessels,
    vesselsError: state.vessels.error,
    origins: state.origins.origins,
    originError: state.origins.error,
    ports: state.ports.ports,
    portsError: state.ports.error
  };
};

export default connect(mapStateToProps, {
  FetchProducts,
  FetchCategroy,
  FetchFamily,
  FetchType,
  FetchClient,
  FetchVessels,
  FetchOrigin,
  FetchPorts
})(DataLoading);
