import React  from "react";


/**
 * 需要属性如下：
 * children : 生产 tr 元素的回调方法 (row,index)
 * firstPageNo: 第一页
 * lastPageNo: 最后一页
 * currentPageNo: 当前页
 * titles: 表头，字符串数组
 * totalPageNo: 总页数
 * onChangeCurrentPageNo: 页号变换回调 (pageNo)
 * rows：数据，数组
 * 
 */
export default class PageTable extends React.Component{
	constructor(props){
		super(props);
	}

	onChangePageNo(pageNo){
		pageNo = pageNo < 1 ? 1 : pageNo;
		pageNo = pageNo > this.props.totalPageNo ? this.props.totalPageNo : pageNo;
		this.props.onChangeCurrentPageNo(pageNo);
	}
	
	render(){
		let props = this.props;
		let trs = null;
		if(props.rows){
			trs = props.rows.map((row,index) => {
				return props.children ? props.children(row,index) : null;
			});
		}

		let lis = [];
		for(let i = props.firstPageNo;i <= props.lastPageNo; i++){
			let className = "";
			if(i == props.currentPageNo){
				className="active";
			}
			lis.push(<li key={i} className={className}><a style={{cursor:"pointer"}}
				onClick={this.onChangePageNo.bind(this,i)}>{i}</a></li>);
		}

		return <div>
			<table id="publishRecordsTable" className="table table-striped table-bordered" style={{margin:"0px auto"}}>
				<thead>
					<tr>
						{props.titles.map((title) => {
							return <th key={title}>{title}</th>
						})}
					</tr>
				</thead>
				<tbody>{trs}</tbody>
			</table>
			<div style={{width:"100%"}}>
				<nav>
					<ul className="pagination">
						<li><a onClick={this.onChangePageNo.bind(this,this.props.currentPageNo - 1)}
									style={{cursor:"pointer"}}>&laquo;上一页</a></li>
						{lis}
						<li><a onClick={this.onChangePageNo.bind(this,this.props.currentPageNo + 1)}
									style={{cursor:"pointer"}}>下一页&raquo;</a></li>
						<li><a style={{cursor:"text"}}>当前&nbsp;{props.currentPageNo}&nbsp;&nbsp;&frasl;&nbsp;&nbsp;{props.totalPageNo}&nbsp;页，共&nbsp;{props.totalCount}&nbsp;条</a></li>
					</ul>
				</nav>
			</div>
		</div>
	}
}