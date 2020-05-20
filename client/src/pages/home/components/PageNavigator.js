import React, { Component } from 'react'

// @material-ui
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Link from 'react-router-dom/Link';

class PageNavigator extends Component {
    render() {
        return (
            <div className="containerPagination">
                <Pagination 
                    count={this.props.numOfPages} 
                    page={this.props.currentPage}
                    color="secondary"
                    showFirstButton 
                    showLastButton
                    variant="outlined"
                    onChange={this.props.pageChangeHandler}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/?p=${item.page}`}
                            {...item}
                        />
                    )}
                />
            </div>
        )
    }
}

export default PageNavigator
