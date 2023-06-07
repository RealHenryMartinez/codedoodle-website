import React from "react";
import { ILabels } from "../../interfaces/form/IForm.js";
import { useAppDispatch, useAppSelector } from "../../store/hook.js";
import {
	card,
	setAddLabel,
	setRemoveLabel,
} from "../../store/slices/postSlice.js";
import * as BiSolid from 'react-icons/bi';
import "../../styles/form/labelConfig.css";

export const LabelConfig = () => {
	const cardData = useAppSelector(card);
	const dispatch = useAppDispatch();
	const [labelInfo, setLabelInfo] = React.useState<ILabels>({
		name: "",
		color: "#3e4361",
	});
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		setLabelInfo((cardInfo) => ({ ...cardInfo, [field]: e.target.value }));
	};
	const submitLabel = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		e.preventDefault();
		dispatch(setAddLabel(labelInfo));
		setLabelInfo({
			name: "",
			color: "#3e4361",
		});
	};
	const removeLabel = (label: ILabels) => {
		dispatch(setRemoveLabel(label));
	};

	return (
		<div id="label-form">
			<h1>Labels</h1>
			<div id="main">
				<div>
					<h3>Add Label</h3>
					<input
						placeholder="Enter label: 'React' "
						type="text"
						value={labelInfo.name}
						onChange={(e) => {
							handleChange(e, "name");
						}}
					/>
				</div>
				<div>
					<h3>Add Color</h3>
					<label id="color-input">
						<input
							type="color"
							value={labelInfo.color}
							onChange={(e) => {
								handleChange(e, "color");
							}}
						/>
					</label>
				</div>
			</div>

			<br />
			{cardData.labels!.length < 3 ? (
				<input
					type="submit"
					onClick={(e) => {
						submitLabel(e);
					}}
					value="Add Label"
				/>
			) : <h1>Max Amount: 3</h1>}

			<div id="all-labels">
				{cardData.labels?.map((label, index) => {
					return (
						<div
							style={{ backgroundColor: label.color }}
							key={index}
							className="label-card"
						>
							<p>{label.name}</p>
							<button onClick={() => removeLabel(label)}>
								<BiSolid.BiTrashAlt size={25} color="#fff"/>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};
