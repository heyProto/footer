import React from 'react';
import { all as axiosAll, get as axiosGet, spread as axiosSpread } from 'axios';

export default class toFooter extends React.Component {

  constructor(props) {
    super(props)
    let stateVar = {
      fetchingData: true,
      dataJSON: {},
      languageTexts: undefined,
      siteConfigs: this.props.siteConfigs
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
      stateVar.languageTexts = this.getLanguageTexts(this.props.dataJSON.data.language);
    }

    if (this.props.siteConfigs) {
      stateVar.siteConfigs = this.props.siteConfigs;
    }


    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph_div').getBoundingClientRect();
  }

  componentDidMount() {
    if (this.state.fetchingData) {
      let items_to_fetch = [
        axiosGet(this.props.dataURL)
      ];

      if (this.props.siteConfigURL) {
        items_to_fetch.push(axiosGet(this.props.siteConfigURL));
      }

      axiosAll(items_to_fetch).then(axiosSpread((card, site_configs) => {
        let stateVar = {
          fetchingData: false,
          dataJSON: card.data,
          siteConfigs: site_configs ? site_configs.data : this.state.siteConfigs
        };

        stateVar.dataJSON.data.language = stateVar.siteConfigs.primary_language.toLowerCase();
        stateVar.languageTexts = this.getLanguageTexts(stateVar.dataJSON.data.language);
        this.setState(stateVar);
      }));
    } else {
      this.componentDidUpdate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dataJSON) {
      this.setState({
        dataJSON: nextProps.dataJSON
      });
    }
  }

  componentDidUpdate() {
    let data = this.state.dataJSON.data;
  }


  getLanguageTexts(languageConfig) {
    let language = languageConfig ? languageConfig : "hindi",
      text_obj;

    switch(language.toLowerCase()) {
      case "hindi":
        text_obj = {
          font: "'Sarala', sans-serif"
        }
        break;
      default:
        text_obj = {
          font: undefined
        }
        break;
    }

    return text_obj;
  }

  renderLaptop() {
    let data = this.state.dataJSON.data;
    if (this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      let check = data.description || data.company_icon || data.branding_icon,
      checkTwo = data.link_groups.length > 0,
      fix = check ? 5 : 8; 
      return(
        <div className="pro-container">
          <div className="pro-publisher-footer">
            {check && <div className={checkTwo ? "pro-col-5 branding-area" :"pro-col-16 branding-area"}>
              <div className="project-publisher-branding">
                {data.company_icon && <div className="publisher-logo" style={{borderRight:data.branding_icon ? "1px solid #efefef":"none"}}><img src={data.company_icon} height="100%"></img></div>}
                {data.branding_icon && <div className="project-logo"><img src={data.branding_icon} height="100%"></img></div>}
              </div>
              {data.description && <div className="project-publisher-description">
                <p>{data.description}</p></div>}
            </div>}
            {checkTwo && <div className={check ? "pro-col-11 links-area":"pro-col-16 links-area"}>
              {
                data.link_groups && data.link_groups.map((group,i)=>{
                  if((i+1) % fix === 0){
                    return(
                      <div key={"group-"+i}>
                        <div className="pro-links-group">
                          <div className="links-group-title">{group.heading}</div>
                          <ul>
                            {
                              group.links && group.links.map((link,i)=>{
                                return(
                                  <li key={"link-"+i}><a rel={link.nofollow ? "nofollow" : "dofollow"} target = {link.is_external ? "_blank" : "_self"} href={link.link}>{link.text}</a></li>
                                )
                              })
                            }
                          </ul>
                        </div>
                        <div className="pro-clear-fix"></div>
                      </div>
                    )
                  }else{
                    return(
                      <div key={"group-"+i}>
                        <div className="pro-links-group">
                          <div className="links-group-title">{group.heading}</div>
                          <ul>
                            {
                              group.links && group.links.map((link,i)=>{
                                return(
                                  <li key={"link-"+i}><a rel={link.nofollow ? "nofollow" : "dofollow"} target = {link.is_external ? "_blank" : "_self"} href={link.link}>{link.text}</a></li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>}
            <div className="pro-col-16">
                <div className="pro-links-bar">
                  {
                    data.bottom_links && data.bottom_links.map((blink,i)=>{
                      if(i !== data.bottom_links.length - 1){
                        return(
                          <div key={"blink-"+i} className="pro-blink"><a rel={blink.nofollow ? "nofollow" : "dofollow"} target = {blink.is_external ? "_blank" : "_self"} href={blink.link}>{blink.text}</a>/ </div>
                        )
                      }else{
                        return(
                          <div key={"blink-"+i} className="pro-blink"><a rel={blink.nofollow ? "nofollow" : "dofollow"} target = {blink.is_external ? "_blank" : "_self"} href={blink.link}>{blink.text}</a></div>
                        )
                      }
                    })
                  }
                </div>
                {data.copyright && <div className="pro-small-text">
                  {data.copyright}
                </div>}
              </div>
          </div>
        </div>
      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
        break;
    }
  }
}
