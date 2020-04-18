import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

class InstagramSnapshot extends React.Component {
  render() {
    const { data } = this.props
    if (!data) return null;
    const { edges: images } = data.allInstaNode

    return (
      <div className="columns is-multiline">
        {images && images.map(({ node: image }) => (
          <div key={image.id}>
            <Img
              fixed={image.localFile.childImageSharp.fixed}
              alt={image.caption}
            />
          </div>
        ))}
      </div>
    )
  }
}

InstagramSnapshot.propTypes = {
  data: PropTypes.shape({
    allInstaNode: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query InstagramImagesQuery {
        allInstaNode(limit: 6) {
          edges {
            node {
              id
              likes
              comments
              mediaType
              preview
              original
              timestamp
              caption
              localFile {
                childImageSharp {
                  fixed(width: 150, height: 150) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              # Only available with the public api scraper
              thumbnails {
                src
                config_width
                config_height
              }
              dimensions {
                height
                width
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <InstagramSnapshot data={data} count={count} />}
  />
)
