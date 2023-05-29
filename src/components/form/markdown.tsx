import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import "../../styles/form/markdown.css";
import ReactMarkdown from "react-markdown";
import IMarkdown from "../../interfaces/form/IMarkdown.js";

export const Markdown = ({ markdownText }: IMarkdown) => {
	// REMEMBER: Markdown is supposed to be immutable and formatted with no tabs as it destroys the styles, keep it like this format
	const markdown = `## hello 
## world
Just a link: https://reactjs.com.
> A block quote with **strikethrough** and a URL: https://reactjs.org.
* Lists
* [ ] todo
* [x] done

A table:

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZcJkp2dsHP6ok0hcGQrac5Q7gRP3F3bPk6vQUpwH8&s" alt="hello"/>

| a | b |
| - | - |
      `;
	return (
		<>
			<div id="markdown-canvas">
                <h3>Preview</h3>
				<ReactMarkdown
					remarkPlugins={[remarkBreaks]}
					rehypePlugins={[rehypeRaw]}
					children={markdownText?.replace(/\n/gi, `&nbsp;\n`)}
				/>
			</div>
		</>
	);
};
