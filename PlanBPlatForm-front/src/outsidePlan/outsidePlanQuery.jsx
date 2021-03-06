import React  from "react";

import PageTable  from "../common/pageTable.jsx";

import LabelDiv from "../common/labelDiv.jsx";

import InputDiv from "../common/inputDiv.jsx";

import SelectDiv from "../common/selectDiv.jsx";
import {Dropdown} from 'semantic-ui-react';

export default class OutsidePlanQuery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:{},
            yearOptions:[]
        }
    }

    componentWillMount(){
        this.loadYearOptions();
        this.loadQuarterOptions();
    }
    
    loadYearOptions(){
        let yearOptions = [];
        $.get("../api/sysQry/yearQuery.do",{}, (data)=>{
            for(let i=0;i<data.length;i++){
                yearOptions.push({
                    key:data[i].code,
                    value:data[i].code,
                    text:data[i].codeName
                });
            }
            this.setState({
                yearOptions:yearOptions
            });
        },"json");
    }
    
    loadQuarterOptions(){
        $.get("../api/sysQry/quarterQuery.do",{}, (data)=>{
            this.setState({
                quarterOptions:data
            });
        },"json");
    }

    renderYearOptions(e,{name}){
        let value = e.currentTarget.children[0].innerHTML;
        console.log(value);
        let data = this.state.data;
        for(let i=0;i<this.state.yearOptions.length;i++){
            if(value === this.state.yearOptions[i].text){
                data["yearKey"] = this.state.yearOptions[i].key
            }
        }
        data[name] = value;
        this.setState({
            data:data
        });
    }

    renderQuarterOptions(){
        if(this.state.quarterOptions){
            let quarterOptions = this.state.quarterOptions;
            return quarterOptions.map((option,index) =>{
                return <option key={index} value={option.code}>{option.codeName}</option>
            })
        }else{
            return <option></option>
        }
    }

    renderModularOptions(){
        
    }

    renderAnalystOptions(){
        
    }

    renderDeveloperOptions(){
        
    }

    queryPlans(){
        this.onChangeCurrentPageNo(1);
    }
    
    addPlan(){
        this.props.onViewDetails();
    }
    
    delPlan(){
        
    }

    viewDetails(){
        
    }

    onChangeCurrentPageNo(pageNo){
        $.get("../api/planManage/planQuery/" + pageNo +".do",{
            year:this.state.data.year,
            quarter:this.state.data.quarter,
            modular:this.state.data.modular,
            seq:this.state.data.seq,
            oa:this.state.data.oa,
            analyst:this.state.data.analyst,
            developer:this.state.data.developer
        },(data)=>{
            this.setState({
                pageData:data
            });
        });
    }

    onInputDataChange(e) {
        let data = this.state.data;
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({
            data:data
        })
    }


    renderTitle(){
        return <div className="container-fluid">
            <div className="form-group">
                <div className="row">
                    <LabelDiv title="年度"/>
                    <Dropdown selection search
                              name="year"
                              defaultValue={this.state.data.year}
                              onChange={this.renderYearOptions.bind(this)}
                              style={{width:"100%"}}
                              options={this.state.yearOptions}
                    />
                    <LabelDiv title="季度"/>
                    <SelectDiv name="quarter" value="" onChange={this.onInputDataChange.bind(this)}>
                        {this.renderQuarterOptions()}
                    </SelectDiv>
                    <LabelDiv title="模块"/>
                    <SelectDiv name="modular" onChange={this.onInputDataChange.bind(this)}>
                        {this.renderModularOptions()}
                    </SelectDiv>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <LabelDiv title="需求号"/>
                    <InputDiv name="seq" value={this.state.data.seq} onChange={this.onInputDataChange.bind(this)}/>
                    <LabelDiv title="OA号"/>
                    <InputDiv name="oa" value={this.state.data.oa} onChange={this.onInputDataChange.bind(this)}/>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <LabelDiv title="分析人员"/>
                    <SelectDiv name="modular" onChange={this.onInputDataChange.bind(this)}>
                        {this.renderAnalystOptions()}
                    </SelectDiv>
                    <LabelDiv title="开发人员"/>
                    <SelectDiv name="modular" onChange={this.onInputDataChange.bind(this)}>
                        {this.renderDeveloperOptions()}
                    </SelectDiv>
                </div>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" style={{marginRight:"10px"}} onClick={this.queryPlans.bind(this)}>查 询</button>
                <button className="btn btn-primary" onClick={this.addPlan.bind(this)}>新 增</button>
            </div>
        </div>
    }

    renderPageTable(){
        if(this.state.pageData){
            let pageData = this.state.pageData;
            return <PageTable  firstPageNo={pageData.firstPage} lastPageNo={pageData.lastPage} currentPageNo={pageData.pageNum}
                               totalPageNo={pageData.pages} totalCount={pageData.total}
                               titles={["OA号","需求号","需求名称","分析人员","分析开始时间","分析结束时间","开发人员","开发开始时间","开发结束日期","操作"]}
                               rows={pageData.list} onChangeCurrentPageNo={this.onChangeCurrentPageNo.bind(this)}>
                {
                    (row,index)=>{

                        return <tr key={index}>
                            <td>{row.oa}</td>
                            <td>{row.seq}</td>
                            <td>{row.seqName}</td>
                            <td>{row.analyst}</td>
                            <td>{row.analyStart?$.formatDateTime('yy-mm-dd', new Date(row.analyStart)):""}</td>
                            <td>{row.analyEnd?$.formatDateTime('yy-mm-dd', new Date(row.analyEnd)):""}</td>
                            <td>{row.developer}</td>
                            <td>{row.developerStart?$.formatDateTime('yy-mm-dd', new Date(row.developerStart)):""}</td>
                            <td>{row.developerEnd?$.formatDateTime('yy-mm-dd', new Date(row.developerEnd)):""}</td>
                            <td>
                                <button className="btn btn-primary" style={{marginRight:"20px"}} onClick={this.viewDetails.bind(this,row)}>查 看 详 情</button>
                                <button className="btn btn-success" onClick={this.delPlan.bind(this,row)}>删 除</button>
                            </td>
                        </tr>
                    }
                }
            </PageTable>
        }else{
            return <div></div>
        }
    }

    render(){
        return <div className="container-fluid" style={{marginTop:"70px"}}>
            <div className="panel panel-primary">
                <div className="panel-heading panel-heading-special">需求查询</div>
                <div className="panel-body">
                    {this.renderTitle()}
                    {this.renderPageTable()}
                </div>
            </div>
        </div>
    }
}