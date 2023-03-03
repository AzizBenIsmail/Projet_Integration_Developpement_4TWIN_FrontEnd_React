import FuseExample from '@fuse/core/FuseExample';
import FuseHighlight from '@fuse/core/FuseHighlight';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
/* eslint import/no-webpack-loader-syntax: off */
/* eslint import/extensions: off */
/* eslint no-unused-vars: off */
/* eslint-disable jsx-a11y/accessible-emoji */

function Grid2Doc(props) {
  return (
    <>
      <div className="flex flex-1 grow-0 items-center justify-end">
        <Button
          className="normal-case"
          variant="contained"
          color="secondary"
          component="a"
          href="https://mui.com/components/grid2"
          target="_blank"
          role="button"
          startIcon={<FuseSvgIcon>heroicons-outline:external-link</FuseSvgIcon>}
        >
          Reference
        </Button>
      </div>
      <Typography className="text-40 my-16 font-700" component="h1">
        Grid version 2
      </Typography>
      <Typography className="description">
        The responsive layout grid adapts to screen size and orientation, ensuring consistency
        across layouts.
      </Typography>

      <Typography className="mb-40" component="div">
        The <code>Grid</code> component works well for a layout with a known number of columns. The
        columns can be configured with multiple breakpoints to specify the column span of each
        child.
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        What&#39;s changed
      </Typography>
      <Typography className="mb-40" component="div">
        We built the <code>Grid</code> component from scratch in order to:
      </Typography>
      <ul>
        <li>
          Fix <a href="https://github.com/mui/material-ui/pull/32746">known issues</a> introduced in
          Material UI v5.
        </li>
        <li>
          Simplify the logic with CSS variables, removing the unnecessary <code>item</code> prop and
          reducing CSS specificity.
        </li>
        <li>
          Introduce a proper fix for <a href="#prevent-scrollbar">preventing a scrollbar</a> by
          switching between negative margin approaches.
        </li>
        <li>Set negative margins of equal size on all sides of the grid container by default.</li>
      </ul>
      <Typography className="mb-40" component="div">
        Since the new implementation is considered a breaking change, we introduced it as{' '}
        <code>Unstable_Grid2</code> to gather feedbacks from the community before making it stable
        in the next major release of Material UI.
      </Typography>
      <Typography className="mb-40" component="div">
        We encourage everyone to try the new version of the <code>Grid</code> by visiting the{' '}
        <a href="/material-ui/migration/migration-grid-v2/">Grid v2 migration guide</a>.
      </Typography>
      <Typography className="mb-40" component="div">
        :::info From now on, the <code>Grid</code> v1 and <code>Grid</code> v2 refer to the import
        as:
      </Typography>

      <FuseHighlight component="pre" className="language-js">
        {` 
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
`}
      </FuseHighlight>
      <Typography className="mb-40" component="div">
        :::
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        How it works
      </Typography>
      <Typography className="mb-40" component="div">
        The grid system is implemented with the <code>Grid</code> component:
      </Typography>
      <ul>
        <li>
          It uses <a href="https://www.w3.org/TR/css-flexbox-1/">CSS Flexbox</a> (rather than CSS
          Grid) for high flexibility.
        </li>
        <li>
          The grid is always a flex item. Use the <code>container</code> prop to add a flex
          container.
        </li>
        <li>
          Item widths are set in percentages, so they&#39;re always fluid and sized relative to
          their parent element.
        </li>
        <li>
          There are five default grid breakpoints: xs, sm, md, lg, and xl. If you need custom
          breakpoints, check out <a href="#custom-breakpoints">custom breakpoints grid</a>.
        </li>
        <li>
          You can give integer values for each breakpoint, to indicate how many of the 12 available
          columns are occupied by the component when the viewport width satisfies the{' '}
          <a href="/material-ui/customization/breakpoints/#default-breakpoints">
            breakpoint constraints
          </a>
          .
        </li>
        <li>
          It uses negative margins and padding to create gaps between children, which behave
          similarly to{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gap">
            the <code>gap</code> CSS property
          </a>
          .
        </li>
        <li>
          It does <em>not</em> support row spanning. Children elements cannot span multiple rows. We
          recommend using{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout">CSS Grid</a> if
          you need this functionality.
        </li>
        <li>
          It does <em>not</em> automatically place children. It will try to fit the children one by
          one, and if there is not enough space, the rest of the children will start on the next
          line, and so on. If you need auto-placement, we recommend using{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Auto-placement_in_CSS_Grid_Layout">
            CSS Grid
          </a>{' '}
          instead.
        </li>
      </ul>
      <Typography className="mb-40" component="div">
        :::warning The <code>Grid</code> component is a <em>layout</em> grid, not a <em>data</em>{' '}
        grid. If you need a data grid, check out{' '}
        <a href="/x/react-data-grid/">
          the MUI X <code>DataGrid</code> component
        </a>
        . :::
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Fluid grids
      </Typography>
      <Typography className="mb-40" component="div">
        Fluid grids use columns that scale and resize content. A fluid grid&#39;s layout can use
        breakpoints to determine if the layout needs to change dramatically.
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Basic grid
      </Typography>
      <Typography className="mb-40" component="div">
        In order to create a grid layout, you need a container. Use the <code>container</code> prop
        to create a grid container that wraps the grid items (the <code>Grid</code> is always an
        item).
      </Typography>
      <Typography className="mb-40" component="div">
        Column widths are integer values between 1 and 12. They can be applied at any breakpoint to
        indicate how many columns are occupied by the component.
      </Typography>
      <Typography className="mb-40" component="div">
        A value given to a breakpoint applies to all the other wider breakpoints unless
        overridden—see <a href="#multiple-breakpoints">Multiple breakpoints</a> for details. For
        example, a component with <code>{`xs={12}`}</code> occupies the whole viewport width
        regardless of its size.
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="BasicGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/BasicGrid.js').default}
          raw={require('!raw-loader!../components/grid2/BasicGrid.js')}
        />
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Multiple breakpoints
      </Typography>
      <Typography className="mb-40" component="div">
        Components may have multiple widths defined, causing the layout to change at the defined
        breakpoint. Width values given to larger breakpoints override those given to smaller
        breakpoints.
      </Typography>
      <Typography className="mb-40" component="div">
        For example, a component with <code>{`xs={12} sm={6}`}</code> occupies the entire viewport
        width when the viewport is{' '}
        <a href="/material-ui/customization/breakpoints/#default-breakpoints">
          less than 600 pixels wide
        </a>
        . When the viewport grows beyond this size, the component occupies half of the total
        width—six columns rather than 12.
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="FullWidthGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/FullWidthGrid.js').default}
          raw={require('!raw-loader!../components/grid2/FullWidthGrid.js')}
        />
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Spacing
      </Typography>
      <Typography className="mb-40" component="div">
        Use the <code>spacing</code> prop to control the space between children. The spacing value
        can be any positive number (including decimals) or a string. The prop is converted into a
        CSS property using the{' '}
        <a href="/material-ui/customization/spacing/">
          <code>theme.spacing()</code>
        </a>{' '}
        helper.
      </Typography>
      <Typography className="mb-40" component="div">
        The following demo illustrates the use of the <code>spacing</code> prop:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="SpacingGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/SpacingGrid.js').default}
          raw={require('!raw-loader!../components/grid2/SpacingGrid.js')}
        />
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Row and column spacing
      </Typography>
      <Typography className="mb-40" component="div">
        The <code>rowSpacing</code> and <code>columnSpacing</code> props let you specify row and
        column gaps independently of one another. They behave similarly to the <code>row-gap</code>{' '}
        and <code>column-gap</code> properties of{' '}
        <a href="/system/grid/#row-gap-amp-column-gap">CSS Grid</a>.
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="RowAndColumnSpacing.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/RowAndColumnSpacing.js').default}
          raw={require('!raw-loader!../components/grid2/RowAndColumnSpacing.js')}
        />
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Responsive values
      </Typography>
      <Typography className="mb-40" component="div">
        You can set prop values to change when a given breakpoint is active. For instance, we can
        implement Material Design&#39;s{' '}
        <a href="https://material.io/design/layout/responsive-layout-grid.html">recommended</a>{' '}
        responsive layout grid, as seen in the following demo:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="ResponsiveGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/ResponsiveGrid.js').default}
          raw={require('!raw-loader!../components/grid2/ResponsiveGrid.js')}
        />
      </Typography>
      <Typography className="mb-40" component="div">
        Responsive values are supported by:
      </Typography>
      <ul>
        <li>
          <code>columns</code>
        </li>
        <li>
          <code>columnSpacing</code>
        </li>
        <li>
          <code>direction</code>
        </li>
        <li>
          <code>rowSpacing</code>
        </li>
        <li>
          <code>spacing</code>
        </li>
        <li>
          all other <a href="#system-props">MUI System props</a>
        </li>
      </ul>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Auto-layout
      </Typography>
      <Typography className="mb-40" component="div">
        The auto-layout feature gives equal space to all items present. When you set the width of
        one item, the others will automatically resize to match it.
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="AutoGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/AutoGrid.js').default}
          raw={require('!raw-loader!../components/grid2/AutoGrid.js')}
        />
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Variable width content
      </Typography>
      <Typography className="mb-40" component="div">
        When a breakpoint&#39;s value is given as <code>{`"auto"`}</code> instead of{' '}
        <code>true</code> or a number, then a column&#39;s size will automatically adjust to match
        the width of its content. The demo below shows how this works:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="VariableWidthGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/VariableWidthGrid.js').default}
          raw={require('!raw-loader!../components/grid2/VariableWidthGrid.js')}
        />
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Nested grid
      </Typography>
      <Typography className="mb-40" component="div">
        The grid container that renders inside another grid container is a nested grid that inherits
        its{' '}
        <a href="#columns">
          <code>columns</code>
        </a>{' '}
        and{' '}
        <a href="#spacing">
          <code>spacing</code>
        </a>{' '}
        from the top level. It will also inherit the props of the top-level grid if it receives
        those props.
      </Typography>
      <Typography className="mb-40" component="div">
        Check out the demo below to see what this looks like:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="NestedGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/NestedGrid.js').default}
          raw={require('!raw-loader!../components/grid2/NestedGrid.js')}
        />
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Columns
      </Typography>
      <Typography className="mb-40" component="div">
        Use the <code>columns</code> prop to change the default number of columns (12) in the grid,
        as shown below:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="ColumnsGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/ColumnsGrid.js').default}
          raw={require('!raw-loader!../components/grid2/ColumnsGrid.js')}
        />
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Offset
      </Typography>
      <Typography className="mb-40" component="div">
        Offset props (such as <code>smOffset</code>, <code>mdOffset</code>) push an item to the
        right side of the grid. These props accept:
      </Typography>
      <ul>
        <li>
          numbers—for example, <code>{`mdOffset={2}`}</code> pushes an item two columns to the right
          when the viewport size is equal to or greater than the <code>md</code> breakpoint.
        </li>
        <li>
          <code>{`"auto"`}</code>—this pushes the item to the far right side of the grid container.
        </li>
      </ul>
      <Typography className="mb-40" component="div">
        The demo below illustrates how to use the offset props:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="OffsetGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/OffsetGrid.js').default}
          raw={require('!raw-loader!../components/grid2/OffsetGrid.js')}
        />
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Custom breakpoints
      </Typography>
      <Typography className="mb-40" component="div">
        If you specify custom breakpoints in the theme, you can use those names as grid item props
        in responsive values:
      </Typography>

      <FuseHighlight component="pre" className="language-js">
        {` 
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Demo() {
  return (
    <ThemeProvider
      theme={createTheme({
        breakpoints: {
          values: {
            laptop: 1024,
            tablet: 640,
            mobile: 0,
            desktop: 1280,
          },
        },
      })}
    >
      <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
        {Array.from(Array(4)).map((_, index) => (
          <Grid mobile={6} tablet={4} laptop={3} key={index}>
            <div>{index + 1}</div>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
}
`}
      </FuseHighlight>
      <Typography className="mb-40" component="div">
        :::info Custom breakpoints affect both size and offset props:
      </Typography>

      <FuseHighlight component="pre" className="language-diff">
        {` 
- <Grid xs={6} xsOffset={2}>
+ <Grid mobile={6} mobileOffset={2}>
`}
      </FuseHighlight>
      <Typography className="mb-40" component="div">
        :::
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        TypeScript
      </Typography>
      <Typography className="mb-40" component="div">
        You have to set module augmentation on the theme breakpoints interface. Properties set to{' '}
        <code>true</code> will appear as <code>{`{key}`}</code>(size prop) and{' '}
        <code>{`{key}Offset`}</code>(offset prop).
      </Typography>

      <FuseHighlight component="pre" className="language-ts">
        {` 
declare module '@mui/system' {
  interface BreakpointOverrides {
    // Your custom breakpoints
    laptop: true;
    tablet: true;
    mobile: true;
    desktop: true;
    // Remove default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}
`}
      </FuseHighlight>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Disable the scrollbar
      </Typography>
      <Typography className="mb-40" component="div">
        If you use grid as a container in a small viewport, you might see a horizontal scrollbar
        because the negative margin is applied on all sides of the grid container.
      </Typography>
      <Typography className="mb-40" component="div">
        To disable this scrollbar, set the <code>disableEqualOverflow</code> prop to{' '}
        <code>true</code>. This removes the negative margins from the bottom and right sides of the
        grid to prevent overflow.
      </Typography>
      <Typography className="mb-40" component="div">
        The demo below shows how this works:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="OverflowGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/OverflowGrid.js').default}
          raw={require('!raw-loader!../components/grid2/OverflowGrid.js')}
        />
      </Typography>
      <Typography className="mb-40" component="div">
        :::warning You should avoid adding borders and backgrounds to the grid when{' '}
        <code>disableEqualOverflow</code> is <code>true</code> because the negative margin (applied
        only at the top and left sides) causes the grid to be visually misaligned. :::
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Customization
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Centered elements
      </Typography>
      <Typography className="mb-40" component="div">
        To center a grid item&#39;s content, specify <code>{`display="flex"`}</code> directly on the
        item. Then use <code>justifyContent</code> and/or <code>alignItems</code> to adjust the
        position of the content, as shown below:
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="CenteredElementGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/CenteredElementGrid.js').default}
          raw={require('!raw-loader!../components/grid2/CenteredElementGrid.js')}
        />
      </Typography>
      <Typography className="mb-40" component="div">
        :::warning Using the <code>container</code> prop does not work in this situation because the
        grid container is designed exclusively to wrap grid items. It cannot wrap other elements.
        :::
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Full border
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="FullBorderedGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/FullBorderedGrid.js').default}
          raw={require('!raw-loader!../components/grid2/FullBorderedGrid.js')}
        />
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Half border
      </Typography>
      <Typography className="mb-40" component="div">
        <FuseExample
          name="HalfBorderedGrid.js"
          className="my-24"
          iframe={false}
          component={require('../components/grid2/HalfBorderedGrid.js').default}
          raw={require('!raw-loader!../components/grid2/HalfBorderedGrid.js')}
        />
      </Typography>
      <Typography className="text-32 mt-40 mb-10 font-700" component="h2">
        Limitations
      </Typography>
      <Typography className="text-20 mt-20 mb-10 font-700" component="h3">
        Column direction and reversing
      </Typography>
      <Typography className="mb-40" component="div">
        The column width (<code>xs</code>, ..., <code>xl</code>) and offset props are <em>not</em>{' '}
        supported within containers that use <code>{`direction="column"`}</code> or{' '}
        <code>{`direction="column-reverse"`}</code>.
      </Typography>
      <Typography className="mb-40" component="div">
        Size and offset props define the number of columns the component will use for a given
        breakpoint. They are intended to control the width using <code>flex-basis</code> in{' '}
        <code>row</code> containers, but they will impact the height in <code>column</code>{' '}
        containers. If used, these props may have undesirable effects on the height of the{' '}
        <code>Grid</code> item elements.
      </Typography>
    </>
  );
}

export default Grid2Doc;
