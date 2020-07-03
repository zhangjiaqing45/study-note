<template>
	<div>
		<el-table :data="nowTableData" border style="width: 100%">
			<el-table-column prop="userHead" label="图书照片">
				<template slot-scope="scope">
					<img class="userHead" :src="scope.row.bookimg" />
				</template>
			</el-table-column>
			<el-table-column prop="_id" label="图书id"></el-table-column>
			<el-table-column prop="date" label="上传日期"></el-table-column>
			<el-table-column prop="username" label="用户名称"></el-table-column>
			<el-table-column prop="bookname" label="图书名称"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="small" @click="handleToDelete(scope.$index, scope.row)" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="page" background layout="prev, pager, next" :current-page.sync="currentPage" :page-size="pageSize" :total="tableData.length"></el-pagination>
	</div>
</template>

<script>
export default {
	name: 'book',
	data() {
		return {
			tableData: [],
			currentPage: 1,
			pageSize: 10
		};
	},
	mounted() {
		this.axios.get('/api2/admin/bookList').then(res => {
			var status = res.data.status;
			if (status === 0) {
				this.tableData = res.data.data.bookList;
			}
		});
	},
	computed: {
		nowTableData() {
			return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) || [];
		}
	},
	methods: {
		handleToDelete(index, row) {
			this.axios
				.post('/api2/admin/deleteBook', {
					id: row._id
				})
				.then(res => {
					var status = res.data.status;
					if (status === 0) {
						this.$alert('删除操作已成功', '信息', {
							confirmButtonText: '确定',
							callback: action => {
								this.tableData.splice(index, 1);
							}
						});
					} else {
						this.$alert('删除操作失败', '信息', {
							confirmButtonText: '确定'
						});
					}
				});
		}
	}
};
</script>

<style scoped>
.page {
	margin-top: 20px;
}
.userHead {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	overflow: hidden;
}
</style>
