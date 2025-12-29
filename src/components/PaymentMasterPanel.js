import React, { createRef, Fragment } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from 'react-intl';
import {
    Grid,
} from "@material-ui/core";
import {
    withHistory,
    withModulesManager,
    AmountInput,
    TextInput,
    PublishedComponent,
    FormPanel,
} from "@openimis/fe-core";
import Button from '@material-ui/core/Button';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const styles = theme => ({
    tableTitle: theme.table.title,
    item: theme.paper.item,
    fullHeight: {
        height: "100%"
    },
});

class PaymentMasterPanel extends FormPanel {

    constructor(props){
        super(props);
        this.divRef = createRef();
    }
    handleReceiptDownload(){
        const input = this.divRef.current;
        console.log("input", input);
        html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("downloaded-content.pdf");
        });
    }

    render() {
        const {
            intl,
            classes,
            edited,
            readOnly,
            overview,
        } = this.props;
        return (
            <Fragment>
                <Grid container className={classes.item}>
                    <Grid item xs={3} className={classes.item}>
                        <PublishedComponent pubRef="core.DatePicker"
                            value={!edited ? "" : edited.receivedDate}
                            module="payment"
                            label="payment.receivedDate"
                            readOnly={true}
                            disabled={true}
                            onChange={p => this.updateAttribute('receivedDate', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <PublishedComponent pubRef="core.DatePicker"
                            value={!edited ? "" : edited.requestDate}
                            module="payment"
                            label="payment.requestDate"
                            readOnly={true}
                            onChange={p => this.updateAttribute('requestDate', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <PublishedComponent pubRef="core.DatePicker"
                            value={!edited ? "" : edited.matchedDate}
                            module="payment"
                            label="payment.matchedDate"
                            readOnly={true}
                            onChange={p => this.updateAttribute('matchedDate', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <PublishedComponent pubRef="core.DatePicker"
                            value={!edited ? "" : edited.dateLastSms}
                            module="payment"
                            label="payment.dateLastSms"
                            readOnly={true}
                            onChange={p => this.updateAttribute('dateLastSms', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <AmountInput
                            module="payment"
                            label="payment.expectedAmount"
                            readOnly={true}
                            value={!edited ? "" : edited.expectedAmount}
                            onChange={p => this.updateAttribute('expectedAmount', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <AmountInput
                            module="payment"
                            label="payment.receivedAmount"
                            readOnly={true}
                            value={!edited ? "" : edited.receivedAmount}
                            onChange={p => this.updateAttribute('receivedAmount', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <AmountInput
                            module="payment"
                            label="payment.transferFee"
                            readOnly={true}
                            value={!edited ? "" : edited.transferFee}
                            onChange={p => this.updateAttribute('transferFee', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <PublishedComponent
                            pubRef="contribution.PremiumPaymentTypePicker"
                            withNull={false}
                            required
                            readOnly={true}
                            value={!edited ? "" : edited.typeOfPayment}
                            onChange={p => this.updateAttribute('typeOfPayment', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <TextInput
                            module="payment"
                            label="payment.receiptNo"
                            readOnly={true}
                            value={!edited ? "" : edited.receiptNo}
                            onChange={p => this.updateAttribute('receiptNo', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <PublishedComponent
                            pubRef="payment.PaymentStatusPicker"
                            withNull={false}
                            readOnly={true}
                            value={!edited ? "" : edited.status}
                            onChange={p => this.updateAttribute('status', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <TextInput
                            module="payment"
                            label="payment.origin"
                            readOnly={true}
                            value={!edited ? "" : edited.origin}
                            onChange={p => this.updateAttribute('origin', p)}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <TextInput
                            module="payment"
                            label="payment.officerCode"
                            readOnly={true}
                            value={!edited ? "" : edited.officerCode}
                            onChange={p => this.updateAttribute('officerCode', p)}
                        />
                    </Grid>
                    {/*  TO-DO: InsureeOfficerPicker is using officer ID and we only have the code */}
                    {/* <Grid item xs={3} className={classes.item} >
                        <PublishedComponent pubRef="insuree.InsureeOfficerPicker"
                            value={!edited ? "" : edited.officerCode}
                            module="payment"
                            label={formatMessage(intl, "payment", "payment.officer")}
                            readOnly={readOnly}
                            onChange={v => this.updateAttribute('officerCode', v ? v.code : null)}
                        />
                    </Grid> */}
                    {/*  TO-DO: rejectedReason is set to null in the back if updated */}
                    {/* <Grid item xs={3} className={classes.item}>
                        <TextInput
                            module="payment"
                            label="payment.rejectedReason"
                            readOnly={readOnly}
                            value={!edited ? "" : edited.rejectedReason}
                            onChange={p => this.updateAttribute('rejectedReason', p)}
                        />
                    </Grid> */}
                    {edited?.status == 1 ? 
                    <Button variant="contained" color="primary" onClick={() => this.handleReceiptDownload()}>
                        Download Receipt
                    </Button>
                    : null}                   
                </Grid>
                 <div
                    ref={this.divRef}
                    style={{
                    color: "black",
                    backgroundColor: "white",
                    padding: 20,
                    width: 400,
                    marginTop: 20,
                    position: "absolute",
                    left: "-9999px", // 👈 move it offscreen so user never sees it
                    }}
                >
                    <p><b>Download Receipt : </b>{edited?.receiptNo}</p>
                    <p><b>Source:</b> {edited?.origin}</p>
                    <p><b>Date:</b> {edited?.receivedDate}</p>
                    <p><b>Amount:</b> {edited?.receivedAmount}</p>
                    <p><b>Payment Type:</b> {edited?.typeOfPayment}</p>
                </div>
            </Fragment>
        );
    }
}

export default withModulesManager(withHistory(injectIntl(withTheme(
    withStyles(styles)(PaymentMasterPanel)
))));