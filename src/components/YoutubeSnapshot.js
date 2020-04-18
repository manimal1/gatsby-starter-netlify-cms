import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

class YoutubeSnapshot extends React.Component {
  render() {
    const { data } = this.props
    const { edges: videos } = data.allYoutubeVideo

    return (
      <div className="columns is-multiline">
        
        {videos && videos.map(({ node: video }) => (
          <div key={video.videoId}>
            <iframe title={video.title} width="560" height="315" src={`https://www.youtube.com/embed/${video.videoId}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    )
  }
}

YoutubeSnapshot.propTypes = {
  data: PropTypes.shape({
    allYoutubeVideo: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query YouTubeVideoQuery {
        allYoutubeVideo(
          sort: { order: DESC, fields: [publishedAt] }
        ) {
          edges {
            node {
              id
              title
              description
              videoId
              publishedAt
              privacyStatus
              channelTitle
            }
          }
        }
      }
    `}
    render={(data, count) => <YoutubeSnapshot data={data} count={count} />}
  />
)
