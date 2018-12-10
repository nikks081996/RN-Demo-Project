import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchPhoto } from './PhotoActionCreators';
import { Loading } from '../../common/LoadingComponent';

class PhotosComponent extends Component {
  componentWillMount() {
    this.props.fetchPhoto();
  }

  render() {
    const RenderData = data => {
      //  console.log('New Data');
      // console.log(data);

      //console.log(data);
      //  const data = this.state.url;
      if (data != null) {
        if (this.props.isLoading) {
          return <Loading />;
        }
        //  this.setState({ uploading: false });
        //  console.log('data');
        // console.log(JSON.stringify(data));
        // const myObjStr = JSON.parse(data);
        // console.log(data);
        // const myObjStr = JSON.parse(data);
        return (
          <FlatList
            data={data}
            renderItem={renderUserCard}
            keyExtractor={item => item.id.toString()}
          />
        );
      }
    };

    const renderUserCard = ({ item, index }) => (
      <View>
        <Tile
          titleStyle={{ alignItems: 'center' }}
          //key={item}
          containerStyle={{ flex: 1, marginRight: 10 }}
          imageSrc={{ uri: item.url }}
          title={item.title}
          contentContainerStyle={{ height: 70 }}
        />
      </View>
    );
    return <View style={styles.mainContainer}>{RenderData(this.props.photo)}</View>;
  }
}

// mapping state data to props
const mapStateToProps = state => {
  const { isLoading, errMess, photo } = state.photos;
  console.log(state.photos.photo);
  return { isLoading, errMess, photo };
};

// connect to the actioncreators
export default connect(
  mapStateToProps,
  { fetchPhoto }
)(PhotosComponent);

const styles = {
  mainContainer: {
    paddingTop: 60
  },
  textViewStyle: {
    flexDirection: 'row'
  },
  textHeaderStyles: {
    marginLeft: 10,
    fontSize: 24,
    color: 'blue',
    justifyContent: 'flex-start',
    flex: 1
  },
  textStyles: {
    fontSize: 20,
    color: 'black',
    justifyContent: 'flex-start',
    flex: 1
  },
  formButton: {
    marginTop: 60,
    marginLeft: 60,
    marginRight: 60
  }
};