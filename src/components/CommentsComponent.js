import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchComment } from '../redux/Action/ActionCreators';
import { Loading } from './LoadingComponent';

class CommentsComponent extends Component {
  componentWillMount() {
    this.props.fetchComment();
  }
  maybeRenderUploadingOverlay = () => {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator color="#000" animating size="large" />
        </View>
      );
    }
  };

  render() {
    const RenderData = data => {
      if (data != null) {
        if (this.props.isLoading) {
          return <Loading />;
        }

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
        <Card key={item.id} containerStyle={styles.cardWithIcon}>
          <View style={styles.cardElementStyle}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.email}</Text>
            <Text style={{ fontSize: 18 }}>{item.body}</Text>
          </View>
        </Card>
      </View>
    );
    return <View style={styles.mainContainer}>{RenderData(this.props.comment)}</View>;
  }
}

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
  cardWithIcon: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 8,
    elevation: 5
  },
  cardElementStyle: {
    flexDirection: 'column'
  }
};

// mapping state data to props
const mapStateToProps = state => {
  const { isLoading, errMess, comment } = state.comments;
  console.log(state.comments.comment);
  return { isLoading, errMess, comment };
};

// connect to the actioncreators
export default connect(
  mapStateToProps,
  { fetchComment }
)(CommentsComponent);
